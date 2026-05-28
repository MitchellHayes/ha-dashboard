import { useEntity } from '@hakit/core';
import { useWeather } from '@hakit/core';
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning, Sunset } from 'lucide-react';
import { useNow } from '../hooks/useNow';
import { useCalendarEvents } from '../hooks/useCalendarEvents';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function fmtTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return { h, m: pad2(m), ampm };
}

function WeatherIcon({ condition, size = 48 }: { condition: string; size?: number }) {
  const c = condition?.toLowerCase() ?? '';
  const props = { size, color: 'var(--accent)', strokeWidth: 1.3 };
  if (c.includes('thunder') || c.includes('lightning')) return <CloudLightning {...props} />;
  if (c.includes('snow') || c.includes('sleet') || c.includes('hail')) return <CloudSnow {...props} />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <CloudRain {...props} />;
  if (c.includes('cloudy') || c.includes('overcast')) return <Cloud {...props} />;
  if (c.includes('partly') || c.includes('mostly clear') || c.includes('few clouds')) return <CloudSun {...props} />;
  return <Sun {...props} />;
}

function fmtEventTime(isoStr: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return 'All day';
  const d = new Date(isoStr);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'p' : 'a';
  h = h % 12 || 12;
  return m === 0 ? `${h}${ampm}` : `${h}:${pad2(m)}${ampm}`;
}

const PEOPLE = [
  { entity: 'person.mitchell' as const, name: 'Mitchell', initial: 'MT' },
  { entity: 'person.michelle' as const, name: 'Michelle', initial: 'ML' },
  { entity: 'person.ryan' as const, name: 'Ryan', initial: 'R' },
];

function PresenceBlock() {
  const mitchell = useEntity('person.mitchell');
  const michelle = useEntity('person.michelle');
  const ryan = useEntity('person.ryan');
  const events = useCalendarEvents('calendar.family_calendar');

  const states = [
    { ...PEOPLE[0], home: mitchell.state === 'home' },
    { ...PEOPLE[1], home: michelle.state === 'home' },
    { ...PEOPLE[2], home: ryan.state === 'home' },
  ];
  const home = states.filter(p => p.home);
  const away = states.filter(p => !p.home);
  const next = events[0];

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '0 28px', flex: 1, gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className='label' style={{ width: 44, flexShrink: 0 }}>
          Home
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {home.map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--accent-dim)',
                  color: 'var(--accent-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  border: '1px solid rgba(245,166,35,0.25)',
                  flexShrink: 0,
                }}
              >
                {p.initial}
              </div>
              <span style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</span>
            </div>
          ))}
          {away.length > 0 && <span style={{ fontSize: 15, color: 'var(--text-3)' }}>· {away.map(p => p.name).join(', ')} away</span>}
        </div>
      </div>
      {next && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className='label' style={{ width: 44, flexShrink: 0 }}>
            Next
          </span>
          <span className='mono' style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent-2)', width: 52, flexShrink: 0 }}>
            {fmtEventTime(next.start)}
          </span>
          <span style={{ fontSize: 15, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {next.summary}
          </span>
        </div>
      )}
    </div>
  );
}

function WeatherBlock() {
  const weather = useWeather('weather.openweathermap', { type: 'daily' });
  const sunSetting = useEntity('sensor.sun_next_setting');

  const temp = Math.round((weather.attributes?.temperature as number) ?? 0);
  const condition = weather.state ?? '';
  const forecast = weather.forecast?.forecast ?? [];
  const hi = forecast[0] ? Math.round(forecast[0].temperature) : '—';
  const lo = forecast[0] && 'templow' in forecast[0] ? Math.round((forecast[0] as { templow: number }).templow) : '—';

  let sunsetStr = '';
  if (sunSetting?.state && sunSetting.state !== 'unavailable' && sunSetting.state !== 'unknown') {
    const d = new Date(sunSetting.state);
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? 'p' : 'a';
    h = h % 12 || 12;
    sunsetStr = `${h}:${pad2(m)}${ampm}`;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '0 28px',
        borderRight: '1px solid var(--border)',
        gap: 4,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <WeatherIcon condition={condition} size={56} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className='mono' style={{ fontSize: 'var(--sz-weather-temp)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            {temp}
          </span>
          <span style={{ fontSize: 'clamp(18px, 1.46vw, 28px)', color: 'var(--text-2)', fontWeight: 300 }}>°F</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'var(--text-2)' }}>
        <span style={{ fontWeight: 500, color: 'var(--text)', textTransform: 'capitalize' }}>{condition}</span>
        <span style={{ color: 'var(--text-3)' }}>·</span>
        <span>H {hi}°</span>
        <span>L {lo}°</span>
        {sunsetStr && (
          <>
            <span style={{ color: 'var(--text-3)' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Sunset size={14} strokeWidth={1.5} /> {sunsetStr}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function NowStrip() {
  const now = useNow();
  const t = fmtTime(now);

  return (
    <div className='card' style={{ padding: 0, flexDirection: 'row', alignItems: 'stretch' }}>
      {/* Clock */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          padding: '0 28px',
          borderRight: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className='mono' style={{ fontSize: 'var(--sz-clock)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9 }}>
            {t.h}
            <span style={{ color: 'var(--text-3)' }}>:</span>
            {t.m}
          </span>
          <span style={{ fontSize: 'clamp(14px, 1.15vw, 22px)', color: 'var(--text-2)', fontWeight: 500 }}>{t.ampm}</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 'clamp(13px, 0.94vw, 18px)', color: 'var(--text-2)', fontWeight: 500 }}>
          {DAYS[now.getDay()]} <span style={{ color: 'var(--text-3)' }}>·</span> {MONTHS[now.getMonth()]} {now.getDate()}
        </div>
      </div>

      {/* Weather */}
      <WeatherBlock />

      {/* Presence + Next */}
      <PresenceBlock />
    </div>
  );
}
