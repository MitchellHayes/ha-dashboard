import { useEntity } from '@hakit/core';
import { RefreshCw, Flame, Snowflake, Minus, Plus } from 'lucide-react';

type HvacMode = 'heat_cool' | 'heat' | 'cool' | 'off';

type AnyService = (args: Record<string, unknown>) => void;

const MODES: { id: HvacMode; label: string; icon?: React.ReactNode }[] = [
  { id: 'heat_cool', label: 'Auto', icon: <RefreshCw size={13} strokeWidth={2} /> },
  { id: 'heat', label: 'Heat', icon: <Flame size={13} strokeWidth={1.5} /> },
  { id: 'cool', label: 'Cool', icon: <Snowflake size={13} strokeWidth={1.5} /> },
  { id: 'off', label: 'Off' },
];

function actionLabel(action: string): string {
  if (action === 'cooling') return 'Cooling';
  if (action === 'heating') return 'Heating';
  if (action === 'fan') return 'Fan';
  if (action === 'idle') return 'Idle';
  return 'Off';
}

export function ClimateCard() {
  const thermostat = useEntity('climate.thermostat');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attrs = (thermostat?.attributes as any) ?? {};
  const hvacMode = (thermostat?.state as HvacMode) ?? 'off';
  const hvacAction = (attrs.hvac_action as string) ?? 'off';
  const isOff = hvacMode === 'off';
  const isRange = hvacMode === 'heat_cool';

  const targetHigh = (attrs.target_temp_high as number | null) ?? null;
  const targetLow = (attrs.target_temp_low as number | null) ?? null;
  const targetSingle = (attrs.temperature as number | null) ?? null;

  const displayTemp = isRange ? targetHigh : targetSingle;
  const displayStr =
    displayTemp !== null && !isOff ? (displayTemp % 1 === 0 ? String(Math.round(displayTemp)) : displayTemp.toFixed(1)) : '—';

  const modeLabel = hvacMode === 'heat_cool' ? 'Auto' : hvacMode === 'cool' ? 'Cool' : hvacMode === 'heat' ? 'Heat' : 'Off';
  const statusText = isOff ? 'Off' : `${actionLabel(hvacAction)} · ${modeLabel}`;

  function adjust(delta: number) {
    if (isOff) return;
    if (isRange && targetHigh !== null && targetLow !== null) {
      (thermostat?.service.setTemperature as unknown as AnyService)({
        serviceData: { target_temp_high: targetHigh + delta, target_temp_low: targetLow + delta },
      });
    } else if (targetSingle !== null) {
      (thermostat?.service.setTemperature as unknown as AnyService)({
        serviceData: { temperature: targetSingle + delta },
      });
    }
  }

  function setMode(mode: HvacMode) {
    (thermostat?.service.setHvacMode as unknown as AnyService)({
      serviceData: { hvac_mode: mode },
    });
  }

  const stepBtn: React.CSSProperties = {
    width: 54,
    height: 54,
    background: 'var(--card-2)',
    border: '1px solid var(--border)',
    color: isOff ? 'var(--text-4)' : 'var(--text-2)',
  };

  return (
    <div className='card' style={{ flexShrink: 0 }}>
      <div className='card-h' style={{ marginBottom: 14 }}>
        <span className='card-title'>Climate</span>
        <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{statusText}</span>
      </div>

      {/* Setpoint + steppers */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '6px 0 4px' }}>
        <button className='ibtn' style={stepBtn} onClick={() => adjust(-1)} disabled={isOff}>
          <Minus size={22} strokeWidth={2} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 140 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-3)' }}>
            Set to
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span
              className='mono'
              style={{
                fontSize: 'clamp(50px, 3.75vw, 72px)',
                fontWeight: 300,
                letterSpacing: '-0.045em',
                lineHeight: 0.9,
                color: isOff ? 'var(--text-3)' : 'var(--text)',
              }}
            >
              {displayStr}
            </span>
            {!isOff && (
              <span
                style={{
                  fontSize: 'clamp(22px, 1.67vw, 32px)',
                  color: 'var(--text-2)',
                  fontWeight: 300,
                  lineHeight: 1,
                  alignSelf: 'flex-start',
                  transform: 'translateY(6px)',
                }}
              >
                °
              </span>
            )}
          </div>
        </div>

        <button className='ibtn' style={stepBtn} onClick={() => adjust(1)} disabled={isOff}>
          <Plus size={22} strokeWidth={2} />
        </button>
      </div>

      {/* Mode segmented control */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          marginTop: 14,
          padding: 4,
          background: 'rgba(0,0,0,0.22)',
          borderRadius: 12,
          border: '1px solid var(--border)',
        }}
      >
        {MODES.map(({ id, label, icon }) => {
          const isActive = hvacMode === id;
          return (
            <button
              key={id}
              onClick={() => setMode(id)}
              style={{
                padding: '9px 6px',
                borderRadius: 9,
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? 'var(--accent-fg)' : 'var(--text-2)',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                cursor: 'pointer',
                transition: 'background 150ms, color 150ms',
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
