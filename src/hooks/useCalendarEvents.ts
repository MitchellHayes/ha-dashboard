import { useState, useEffect, useCallback } from 'react';
import { useHass } from '@hakit/core';

export interface CalendarEvent {
  summary: string;
  start: string; // ISO datetime
  end: string;
  description?: string;
}

export function useCalendarEvents(entityId: string) {
  const callService = useHass(s => s.helpers.callService);
  // Watch entity state so event start/end transitions trigger an immediate refetch.
  const entityState = useHass(s => (s.entities as Record<string, { state: string }>)[entityId]?.state);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const fetchEvents = useCallback(async (): Promise<CalendarEvent[] | null> => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setDate(endOfDay.getDate() + 7);

    try {
      const resp = await callService<Record<string, { events: CalendarEvent[] }>, 'calendar', 'getEvents'>({
        domain: 'calendar',
        service: 'getEvents',
        target: { entity_id: entityId },
        serviceData: {
          start_date_time: now.toISOString(),
          end_date_time: endOfDay.toISOString(),
        },
        returnResponse: true,
      });
      const raw = resp?.response?.[entityId]?.events ?? [];
      return raw.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    } catch {
      return null;
    }
  }, [callService, entityId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const data = await fetchEvents();
      if (!cancelled && data !== null) setEvents(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [entityState, fetchEvents]);

  useEffect(() => {
    const id = setInterval(async () => {
      const data = await fetchEvents();
      if (data !== null) setEvents(data);
    }, 5 * 60_000);
    return () => clearInterval(id);
  }, [fetchEvents]);

  return events;
}
