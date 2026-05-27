import { useState, useEffect } from 'react';
import { useEntity } from '@hakit/core';
import { Timer } from 'lucide-react';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}
function fmtMMSS(secs: number) {
  return `${pad2(Math.floor(secs / 60))}:${pad2(secs % 60)}`;
}

function getRemainingSeconds(finishesAt: string | undefined): number {
  if (!finishesAt) return 0;
  const remaining = Math.max(0, Math.floor((new Date(finishesAt).getTime() - Date.now()) / 1000));
  return remaining;
}

const PRESETS = [5, 10, 15, 30, 45];

export function TimerCard() {
  const timer = useEntity('timer.kitchen_timer');
  const [preset, setPreset] = useState(0);
  const [display, setDisplay] = useState(0);

  const isRunning = timer?.state === 'active';
  const finishesAt = (timer?.attributes as { finishes_at?: string } | undefined)?.finishes_at;

  // Tick every second when running
  useEffect(() => {
    if (!isRunning) {
      setDisplay(getRemainingSeconds(finishesAt));
      return;
    }
    setDisplay(getRemainingSeconds(finishesAt));
    const id = setInterval(() => {
      const rem = getRemainingSeconds(finishesAt);
      setDisplay(rem);
      if (rem <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, finishesAt]);

  const durationAttr = (timer?.attributes as { duration?: string } | undefined)?.duration ?? '0:00:00';
  const totalSecs = durationAttr.split(':').reduce((acc, v, i) => {
    const parts = durationAttr.split(':');
    if (parts.length === 3) return i === 0 ? acc + parseInt(v) * 3600 : i === 1 ? acc + parseInt(v) * 60 : acc + parseInt(v);
    return acc + parseInt(v) * (i === 0 ? 60 : 1);
  }, 0);

  const progress = isRunning && totalSecs > 0 ? 1 - display / totalSecs : 0;
  const circumference = 2 * Math.PI * 43;

  function startTimer() {
    if (!preset) return;
    const minutes = preset;
    timer?.service.start({ serviceData: { duration: { minutes } } });
  }

  function cancelTimer() {
    timer?.service.cancel();
    setPreset(0);
  }

  const showTime = isRunning ? display : preset * 60;

  return (
    <div className='card'>
      <div className='card-h'>
        <span className='card-title'>Kitchen timer</span>
        <span className='card-action' style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {isRunning ? (
            <>
              <span className='dot on' /> running
            </>
          ) : (
            'idle'
          )}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* Progress ring */}
        <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
          <svg width='96' height='96' style={{ transform: 'rotate(-90deg)' }}>
            <circle cx='48' cy='48' r='43' stroke='rgba(255,255,255,0.06)' strokeWidth='5' fill='none' />
            <circle
              cx='48'
              cy='48'
              r='43'
              stroke='var(--accent)'
              strokeWidth='5'
              fill='none'
              strokeLinecap='round'
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isRunning ? 'var(--accent)' : 'var(--text-3)',
            }}
          >
            <Timer size={26} strokeWidth={1.4} />
          </div>
        </div>

        <div className='col-flex grow'>
          <span className='mono' style={{ fontSize: 'var(--sz-timer)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {fmtMMSS(showTime)}
          </span>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {PRESETS.map(m => (
              <button
                key={m}
                onClick={() => !isRunning && setPreset(m)}
                disabled={isRunning}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: preset === m ? 'var(--accent-dim)' : 'var(--card-2)',
                  border: `1px solid ${preset === m ? 'rgba(245,166,35,0.35)' : 'var(--border)'}`,
                  color: preset === m ? 'var(--accent-2)' : 'var(--text-2)',
                  fontSize: 13,
                  fontWeight: 500,
                  opacity: isRunning ? 0.4 : 1,
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                }}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {!isRunning ? (
          <button
            onClick={startTimer}
            disabled={!preset}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              background: preset ? 'var(--accent)' : 'var(--card-2)',
              color: preset ? '#1a1100' : 'var(--text-3)',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: preset ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            START TIMER
          </button>
        ) : (
          <button
            onClick={cancelTimer}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              background: 'rgba(232,93,79,0.12)',
              color: 'var(--alert)',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.04em',
              border: '1px solid rgba(232,93,79,0.25)',
            }}
          >
            CANCEL
          </button>
        )}
      </div>
    </div>
  );
}
