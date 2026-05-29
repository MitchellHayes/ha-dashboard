import { useEntity } from '@hakit/core';
import { useWeather } from '@hakit/core';
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning } from 'lucide-react';
import { useNow } from '../hooks/useNow';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { useHassPhoto } from '../hooks/useHassPhoto';

const DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

function fmtEventTime(isoStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return 'All day';
  const d = new Date(isoStr);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'p' : 'a';
  h = h % 12 || 12;
  return m === 0 ? `${h}${ampm}` : `${h}:${pad2(m)}${ampm}`;
}

function fmtEventDate(isoStr: string): string | null {
  const raw = /^\d{4}-\d{2}-\d{2}$/.test(isoStr) ? `${isoStr}T00:00:00` : isoStr;
  const d = new Date(raw);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((eventDay.getTime() - today.getTime()) / 86_400_000);
  if (diffDays < 0) return null;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 6) return DAYS_SHORT[d.getDay()];
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function relFromNow(isoStr: string, now: Date): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return '';
  const diffMin = Math.round((new Date(isoStr).getTime() - now.getTime()) / 60_000);
  if (Math.abs(diffMin) <= 1) return 'starting now';
  if (diffMin > 0 && diffMin <= 60) return `in ${diffMin} min`;
  if (diffMin > 60 && diffMin <= 1440) return `in ${Math.round(diffMin / 60)} hr`;
  if (diffMin > 1440 && diffMin <= 2880) return 'tomorrow';
  if (diffMin > 2880) return `in ${Math.round(diffMin / 1440)} days`;
  return '';
}

function locStr(state: string): string {
  if (state === 'home') return '';
  if (!state || state === 'not_home') return 'Away';
  return `At ${state.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`;
}

function WeatherIcon({ condition, size = 48 }: { condition: string; size?: number }) {
  const c = condition?.toLowerCase() ?? '';
  const p = { size, color: 'var(--accent)', strokeWidth: 1.3 };
  if (c.includes('thunder') || c.includes('lightning')) return <CloudLightning {...p} />;
  if (c.includes('snow') || c.includes('sleet') || c.includes('hail')) return <CloudSnow {...p} />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower') || c.includes('pouring')) return <CloudRain {...p} />;
  if (c.includes('cloudy') || c.includes('overcast')) return <Cloud {...p} />;
  if (c.includes('partly') || c.includes('mostly clear') || c.includes('few clouds')) return <CloudSun {...p} />;
  return <Sun {...p} />;
}

function Stat({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: first ? '0 14px 0 0' : '0 14px',
        minWidth: 64,
        borderLeft: first ? undefined : '1px solid var(--border)',
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-3)' }}>
        {label}
      </span>
      <span className='mono' style={{ fontSize: 16, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1 }}>
        {value}
      </span>
    </div>
  );
}

function PersonTile({ name, initial, picturePath, state }: { name: string; initial: string; picturePath?: string; state: string }) {
  const photoUrl = useHassPhoto(picturePath);
  const home = state === 'home';
  const loc = locStr(state);

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 20px 16px', justifyItems: 'center', rowGap: 6, minWidth: 74 }}>
      {/* Avatar */}
      <div
        style={{
          width: 74,
          height: 74,
          borderRadius: '50%',
          backgroundImage: photoUrl
            ? `url(${photoUrl})`
            : home
              ? 'linear-gradient(135deg, var(--accent-dim), rgba(255,191,71,0.06))'
              : 'linear-gradient(135deg, var(--card-2), var(--card))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: home ? 'var(--accent-2)' : 'var(--text-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 500,
          border: `2px solid ${home ? 'var(--ring-accent)' : 'var(--border-2)'}`,
          position: 'relative' as const,
          flexShrink: 0,
          filter: !home ? 'saturate(0.4)' : undefined,
          opacity: !home ? 0.65 : undefined,
        }}
      >
        {!photoUrl && initial}
        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '3px solid var(--card)',
            background: home ? 'var(--ok)' : 'var(--text-4)',
          }}
        />
      </div>
      {/* Name */}
      <span style={{ fontSize: 16, fontWeight: 500, color: home ? 'var(--text)' : 'var(--text-2)', textAlign: 'center' }}>{name}</span>
      {/* Location */}
      <span style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>{loc || ' '}</span>
    </div>
  );
}

function WeatherBlock() {
  const weather = useWeather('weather.openweathermap', { type: 'daily' });
  const sunSetting = useEntity('sensor.sun_next_setting');

  const temp = Math.round((weather.attributes?.temperature as number) ?? 0);
  const condition = weather.state ?? '';
  const forecast = weather.forecast?.forecast ?? [];
  const hi = forecast[0] ? `${Math.round(forecast[0].temperature)}°` : '—';
  const lo = forecast[0] && 'templow' in forecast[0] ? `${Math.round((forecast[0] as { templow: number }).templow)}°` : '—';

  let sunsetStr = '—';
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
        padding: '14px 32px',
        borderLeft: '1px solid var(--border)',
        gap: 12,
      }}
    >
      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <WeatherIcon condition={condition} size={56} />
        <div>
          <div
            className='mono'
            style={{ fontSize: 'var(--sz-weather-temp)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 0.85 }}
          >
            {temp}°
          </div>
          <div style={{ fontSize: 15, color: 'var(--text-2)', marginTop: 4, textTransform: 'capitalize' }}>{condition}</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: 'flex', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
        <Stat label='Hi' value={hi} first />
        <Stat label='Lo' value={lo} />
        <Stat label='Sunset' value={sunsetStr} />
      </div>
    </div>
  );
}

function PresenceBlock() {
  const mitchell = useEntity('person.mitchell');
  const michelle = useEntity('person.michelle');
  const ryan = useEntity('person.ryan');
  const takumi = useEntity('device_tracker.takumi_tracker');
  const events = useCalendarEvents('calendar.family_calendar');
  const now = useNow();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ep = (e: { attributes: unknown }) => (e.attributes as any)?.entity_picture as string | undefined;

  const people = [
    { name: 'Mitchell', initial: 'M', picturePath: ep(mitchell), state: mitchell.state ?? '' },
    { name: 'Michelle', initial: 'M', picturePath: ep(michelle), state: michelle.state ?? '' },
    { name: 'Ryan', initial: 'R', picturePath: ep(ryan), state: ryan.state ?? '' },
    { name: 'Takumi', initial: 'T', picturePath: ep(takumi), state: takumi.state ?? '' },
  ];

  const next = events[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextLoc = next ? ((next as any).location as string | undefined) : undefined;
  const dateLabel = next ? fmtEventDate(next.start) : null;
  const relTime = next ? relFromNow(next.start, now) : '';
  const metaParts = [nextLoc, relTime].filter(Boolean) as string[];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 28px',
        borderLeft: '1px solid var(--border)',
        flex: 1,
        gap: 32,
      }}
    >
      {/* Person tiles */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {people.map(p => (
          <PersonTile key={p.name} {...p} />
        ))}
      </div>

      {/* Next-up */}
      {next && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '14px 22px',
            borderLeft: '1px solid var(--border)',
            alignSelf: 'stretch',
            minWidth: 280,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-3)' }}>
              {dateLabel ? `Next · ${dateLabel}` : 'Next'}
            </span>
            <span
              className='mono'
              style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--accent-2)' }}
            >
              {fmtEventTime(next.start)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <span
              style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {next.summary}
            </span>
            {metaParts.length > 0 && <span style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.3 }}>{metaParts.join(' · ')}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export function NowStrip() {
  const now = useNow();
  const t = fmtTime(now);

  return (
    <div
      className='card'
      style={{
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
        alignItems: 'stretch',
        overflow: 'visible',
      }}
    >
      {/* Clock block */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '14px 32px', gap: 12 }}>
        <div>
          <span className='mono' style={{ fontSize: 'var(--sz-clock)', fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 0.85 }}>
            {t.h}
            <span style={{ color: 'var(--text-3)' }}>:</span>
            {t.m}
          </span>
          <span style={{ fontSize: 'clamp(14px, 1.15vw, 22px)', color: 'var(--text-2)', fontWeight: 500, marginLeft: 8 }}>{t.ampm}</span>
        </div>
        <div style={{ display: 'flex', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          <Stat label='Day' value={DAYS_LONG[now.getDay()]} first />
          <Stat label='Date' value={`${MONTHS[now.getMonth()]} ${now.getDate()}`} />
        </div>
      </div>

      {/* Weather block */}
      <WeatherBlock />

      {/* Presence + Next block */}
      <PresenceBlock />
    </div>
  );
}
