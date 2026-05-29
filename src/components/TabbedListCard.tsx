import { useState } from 'react';
import { useWeather } from '@hakit/core';
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning } from 'lucide-react';
import { useCalendarEvents } from '../hooks/useCalendarEvents';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function isDateOnly(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function fmtEventTime(isoStr: string): string {
  if (isDateOnly(isoStr)) return 'All day';
  const d = new Date(isoStr);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'p' : 'a';
  h = h % 12 || 12;
  return m === 0 ? `${h}${ampm}` : `${h}:${pad2(m)}${ampm}`;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmtEventDate(isoStr: string): string | null {
  const raw = isDateOnly(isoStr) ? `${isoStr}T00:00:00` : isoStr;
  const d = new Date(raw);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((eventDay.getTime() - today.getTime()) / 86_400_000);
  if (diffDays < 0) return null;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 6) return WEEKDAYS[d.getDay()];
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function tagColor(summary: string) {
  const s = summary.toLowerCase();
  if (s.includes('dinner') || s.includes('lunch') || s.includes('breakfast') || s.includes('meal') || s.includes('cook'))
    return 'var(--ok)';
  if (s.includes('family') || s.includes('school') || s.includes('soccer') || s.includes('practice')) return 'var(--accent)';
  return 'var(--text-3)';
}

const CONDITION_LABELS: Record<string, string> = {
  sunny: 'Sunny',
  'clear-night': 'Clear',
  partlycloudy: 'Partly Cloudy',
  cloudy: 'Cloudy',
  fog: 'Foggy',
  rainy: 'Rainy',
  pouring: 'Heavy Rain',
  snowy: 'Snow',
  'snowy-rainy': 'Wintry Mix',
  lightning: 'Thunderstorm',
  'lightning-rainy': 'T-Storms',
  windy: 'Windy',
  'windy-variant': 'Windy',
  hail: 'Hail',
  exceptional: 'Unusual',
};

function fmtCondition(c: string): string {
  return CONDITION_LABELS[c] ?? c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function WeatherIcon({ condition, size = 20 }: { condition: string; size?: number }) {
  const c = condition?.toLowerCase() ?? '';
  const props = { size, color: 'var(--accent)', strokeWidth: 1.4 };
  if (c.includes('thunder') || c.includes('lightning')) return <CloudLightning {...props} />;
  if (c.includes('snow') || c.includes('sleet') || c.includes('hail')) return <CloudSnow {...props} />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower') || c.includes('pouring')) return <CloudRain {...props} />;
  if (c.includes('cloudy') || c.includes('overcast')) return <Cloud {...props} />;
  if (c.includes('partly') || c.includes('mostly clear') || c.includes('few')) return <CloudSun {...props} />;
  return <Sun {...props} />;
}

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
function Tab({ active, onClick, children }: TabProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 14px',
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: active ? 'var(--text)' : 'var(--text-3)',
        borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        marginBottom: -1,
        transition: 'color 150ms, border-color 150ms',
      }}
    >
      {children}
    </button>
  );
}

export function TabbedListCard() {
  const [tab, setTab] = useState<'calendar' | 'forecast'>('calendar');
  const events = useCalendarEvents('calendar.family_calendar');
  const weather = useWeather('weather.openweathermap', { type: 'daily' });

  const raw = weather.forecast?.forecast ?? [];
  const days = raw.slice(0, 7).map((f, i) => {
    const date = new Date(f.datetime);
    const lo = 'templow' in f ? Math.round((f as { templow: number }).templow) : null;
    return {
      label: i === 0 ? 'Today' : WEEKDAYS[date.getDay()],
      condition: f.condition ?? '',
      hi: Math.round(f.temperature),
      lo,
      isToday: i === 0,
    };
  });

  const allTemps = days.flatMap(d => (d.lo !== null ? [d.hi, d.lo] : [d.hi]));
  const minT = Math.min(...allTemps);
  const maxT = Math.max(...allTemps);
  const range = maxT - minT || 1;

  return (
    <div className='card grow' style={{ minHeight: 0, padding: 0 }}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px 20px 0',
          borderBottom: '1px solid var(--border)',
          gap: 4,
        }}
      >
        <Tab active={tab === 'calendar'} onClick={() => setTab('calendar')}>
          Calendar
        </Tab>
        <Tab active={tab === 'forecast'} onClick={() => setTab('forecast')}>
          Forecast
        </Tab>
        <div className='grow' />
        <span className='card-action mono' style={{ paddingBottom: 12, fontFamily: 'var(--mono)' }}>
          7 days
        </span>
      </div>

      {/* Content */}
      <div
        className='grow'
        style={{
          padding: '12px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: tab === 'calendar' ? 'auto' : 'hidden',
        }}
      >
        {tab === 'calendar' ? (
          events.length > 0 ? (
            events.slice(0, 10).map((e, i, arr) => {
              const dateLabel = fmtEventDate(e.start);
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 2,
                    }}
                  >
                    {dateLabel && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'var(--text-3)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {dateLabel}
                      </span>
                    )}
                    <span className='mono' style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent-2)', lineHeight: 1.2 }}>
                      {fmtEventTime(e.start)}
                    </span>
                  </div>
                  <div
                    style={{
                      width: 2,
                      height: dateLabel ? 34 : 22,
                      borderRadius: 1,
                      background: tagColor(e.summary),
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: 1.3,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {e.summary}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ fontSize: 15, color: 'var(--text-3)', fontStyle: 'italic', padding: '8px 0' }}>Nothing coming up.</div>
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {days.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '84px 26px 1fr auto',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < days.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: d.isToday ? 600 : 500,
                      color: d.isToday ? 'var(--text)' : 'var(--text-2)',
                      lineHeight: 1.2,
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {fmtCondition(d.condition)}
                  </span>
                </div>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <WeatherIcon condition={d.condition} size={22} />
                </span>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', position: 'relative' }}>
                  {d.lo !== null && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${((d.lo - minT) / range) * 100}%`,
                        width: `${((d.hi - d.lo) / range) * 100}%`,
                        top: 0,
                        bottom: 0,
                        borderRadius: 3,
                        background: 'linear-gradient(90deg, var(--cool), var(--accent))',
                      }}
                    />
                  )}
                </div>
                <span className='mono' style={{ fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  {d.hi}°{d.lo !== null && <span style={{ color: 'var(--text-3)' }}> / {d.lo}°</span>}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
