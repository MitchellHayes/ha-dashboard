import { useWeather } from '@hakit/core';
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning } from 'lucide-react';

function WeatherIcon({ condition, size = 20 }: { condition: string; size?: number }) {
  const c = condition?.toLowerCase() ?? '';
  const props = { size, color: 'var(--accent)', strokeWidth: 1.4 };
  if (c.includes('thunder') || c.includes('lightning')) return <CloudLightning {...props} />;
  if (c.includes('snow') || c.includes('sleet')) return <CloudSnow {...props} />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <CloudRain {...props} />;
  if (c.includes('cloudy') || c.includes('overcast')) return <Cloud {...props} />;
  if (c.includes('partly') || c.includes('mostly clear') || c.includes('few')) return <CloudSun {...props} />;
  return <Sun {...props} />;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function ForecastCard() {
  const weather = useWeather('weather.openweathermap', { type: 'daily' });
  const raw = weather.forecast?.forecast ?? [];

  const days = raw.slice(0, 5).map((f, i) => {
    const date = new Date(f.datetime);
    const lo = 'templow' in f ? (f as { templow: number }).templow : Math.round(f.temperature - 12);
    return {
      label: i === 0 ? 'Today' : DAYS_SHORT[date.getDay()],
      condition: f.condition ?? '',
      hi: Math.round(f.temperature),
      lo: Math.round(lo as number),
      isToday: i === 0,
    };
  });

  // Temp range for bar positioning
  const allTemps = days.flatMap(d => [d.hi, d.lo]);
  const minT = Math.min(...allTemps, 30);
  const maxT = Math.max(...allTemps, 100);
  const range = maxT - minT || 1;

  return (
    <div className='card'>
      <div className='card-h'>
        <span className='card-title'>5-day forecast</span>
        <span className='card-action mono' style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>
          {weather.attributes?.friendly_name?.replace('Home', '') || 'Home'}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 24px 1fr auto',
              alignItems: 'center',
              gap: 12,
              padding: '6px 0',
              borderBottom: i < days.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: d.isToday ? 600 : 500,
                color: d.isToday ? 'var(--text)' : 'var(--text-2)',
              }}
            >
              {d.label}
            </span>
            <span>
              <WeatherIcon condition={d.condition} size={20} />
            </span>
            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${((d.lo - minT) / range) * 100}%`,
                  width: `${((d.hi - d.lo) / range) * 100}%`,
                  top: 0,
                  bottom: 0,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, var(--cool), var(--accent))',
                }}
              />
            </div>
            <span className='mono' style={{ fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap' }}>
              {d.hi}° <span style={{ color: 'var(--text-3)' }}>/ {d.lo}°</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
