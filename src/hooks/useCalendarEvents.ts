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

  const fetchEvents = useCallback(async () => {
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
      setEvents(raw.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()));
    } catch {
      // silently ignore
    }
  }, [callService, entityId]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void fetchEvents();
  }, [entityState, fetchEvents]);

  useEffect(() => {
    const id = setInterval(fetchEvents, 5 * 60_000);
    return () => clearInterval(id);
  }, [fetchEvents]);

  return events;
}
