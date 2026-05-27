import { useState } from 'react';
import { Square } from 'lucide-react';
import { useTodoItems } from '../hooks/useTodoItems';
import { useCalendarEvents } from '../hooks/useCalendarEvents';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function fmtEventTime(isoStr: string) {
  const d = new Date(isoStr);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'p' : 'a';
  h = h % 12 || 12;
  return m === 0 ? `${h}${ampm}` : `${h}:${pad2(m)}${ampm}`;
}

function tagColor(summary: string) {
  const s = summary.toLowerCase();
  if (s.includes('dinner') || s.includes('lunch') || s.includes('breakfast') || s.includes('meal') || s.includes('cook'))
    return 'var(--ok)';
  if (s.includes('family') || s.includes('school') || s.includes('soccer') || s.includes('practice')) return 'var(--accent)';
  return 'var(--text-3)';
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
  const [tab, setTab] = useState<'grocery' | 'today'>('grocery');
  const { items: allItems, completeItem } = useTodoItems('todo.shopping_list');
  const events = useCalendarEvents('calendar.family_calendar');

  const pending = allItems.filter(i => i.status === 'needs_action');
  const meta = tab === 'grocery' ? `${pending.length} of ${allItems.length}` : `${events.length} ${events.length === 1 ? 'item' : 'items'}`;

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
        <Tab active={tab === 'grocery'} onClick={() => setTab('grocery')}>
          Grocery
        </Tab>
        <Tab active={tab === 'today'} onClick={() => setTab('today')}>
          Today
        </Tab>
        <div className='grow' />
        <span className='card-action mono' style={{ paddingBottom: 12, fontFamily: 'var(--mono)' }}>
          {meta}
        </span>
      </div>

      {/* Content */}
      <div className='grow' style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
        {tab === 'grocery' ? (
          pending.length > 0 ? (
            pending.slice(0, 6).map((item, i) => (
              <button
                key={item.uid}
                onClick={() => completeItem(item.uid)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '7px 0',
                  textAlign: 'left',
                  borderBottom: i < Math.min(pending.length, 6) - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <Square size={20} color='var(--text-3)' strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 16, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.summary}
                </span>
              </button>
            ))
          ) : (
            <div style={{ fontSize: 15, color: 'var(--text-3)', fontStyle: 'italic', padding: '8px 0' }}>
              All caught up — nothing to pick up.
            </div>
          )
        ) : events.length > 0 ? (
          events.slice(0, 6).map((e, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '8px 0',
                borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                className='mono'
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--accent-2)',
                  width: 52,
                  flexShrink: 0,
                  lineHeight: 1.3,
                }}
              >
                {fmtEventTime(e.start)}
              </span>
              <div
                style={{
                  width: 2,
                  alignSelf: 'stretch',
                  borderRadius: 1,
                  background: tagColor(e.summary),
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {e.summary}
              </span>
            </div>
          ))
        ) : (
          <div style={{ fontSize: 15, color: 'var(--text-3)', fontStyle: 'italic', padding: '8px 0' }}>Nothing scheduled today.</div>
        )}
      </div>
    </div>
  );
}
