import { useEffect, useState } from 'react';
import { useHass } from '@hakit/core';

export function useTemperatureHistory(entityId: string): number[] {
  const [points, setPoints] = useState<number[]>([]);
  const hassUrl = useHass(s => s.hassUrl);
  const auth = useHass(s => s.auth);

  useEffect(() => {
    async function fetch24h() {
      if (!hassUrl || !auth) return;

      const base = hassUrl.replace(/\/$/, '');
      const end = new Date();
      const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
      const url =
        `${base}/api/history/period/${start.toISOString()}` +
        `?filter_entity_id=${entityId}&minimal_response=true&significant_changes_only=false&end_time=${end.toISOString()}`;

      try {
        const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.data.access_token}` } });
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
        // leave sparkline empty on fetch failure
      }
    }

    void fetch24h();
    const id = setInterval(() => void fetch24h(), 5 * 60_000);
    return () => clearInterval(id);
  }, [entityId, hassUrl, auth]);

  return points;
}
