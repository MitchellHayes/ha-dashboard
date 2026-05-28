import { useEffect, useState } from 'react';

function getHassAuth(): { hassUrl: string; token: string } | null {
  try {
    const raw = localStorage.getItem('hassTokens');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { hassUrl?: string; access_token?: string };
    if (!parsed.hassUrl || !parsed.access_token) return null;
    return { hassUrl: parsed.hassUrl.replace(/\/$/, ''), token: parsed.access_token };
  } catch {
    return null;
  }
}

export function useTemperatureHistory(entityId: string): number[] {
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => {
    const auth = getHassAuth();
    if (!auth) return;

    const end = new Date();
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
    const url =
      `${auth.hassUrl}/api/history/period/${start.toISOString()}` +
      `?filter_entity_id=${entityId}&minimal_response=true&significant_changes_only=false&end_time=${end.toISOString()}`;

    void (async () => {
      try {
        const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } });
        if (!res.ok) return;
        const data = (await res.json()) as { state: string; last_changed: string }[][];
        const raw = data?.[0] ?? [];
        if (raw.length < 2) return;

        const values = raw.map(e => parseFloat(e.state)).filter(v => !isNaN(v));
        if (values.length < 2) return;

        const step = Math.max(1, Math.floor(values.length / 24));
        const sampled: number[] = [];
        for (let i = 0; i < values.length; i += step) sampled.push(values[i]);
        if (sampled[sampled.length - 1] !== values[values.length - 1]) {
          sampled.push(values[values.length - 1]);
        }

        const min = Math.min(...sampled);
        const max = Math.max(...sampled);
        const range = max - min || 1;
        setPoints(sampled.map(v => (v - min) / range));
      } catch {
        // silently leave sparkline empty
      }
    })();
  }, [entityId]);

  return points;
}
