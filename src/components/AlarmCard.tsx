import { useState } from 'react';
import { useEntity } from '@hakit/core';
import { Shield, Unlock, ChevronRight } from 'lucide-react';
import { AlarmPanel } from './AlarmPanel';

type AlarmState = 'disarmed' | 'armed_home' | 'armed_away' | 'armed_night' | 'pending' | 'triggered';

function stateLabel(s: string): string {
  if (s === 'disarmed') return 'Disarmed';
  if (s === 'armed_home') return 'Armed · Home';
  if (s === 'armed_away') return 'Armed · Away';
  if (s === 'armed_night') return 'Armed · Night';
  if (s === 'pending') return 'Pending…';
  if (s === 'triggered') return 'TRIGGERED';
  return s;
}

function stateDotClass(s: string): string {
  if (s === 'disarmed') return 'dot ok';
  if (s === 'triggered' || s === 'armed_away') return 'dot alert';
  return 'dot on';
}

interface ArmButtonProps {
  label: string;
  sub: string;
  targetState: AlarmState;
  currentState: string;
  onClick: () => void;
}

function ArmButton({ label, sub, targetState, currentState, onClick }: ArmButtonProps) {
  const isCurrent = currentState === targetState;
  const tone = targetState === 'armed_away' ? 'var(--alert)' : targetState === 'armed_home' ? 'var(--accent)' : 'var(--ok)';
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '14px 10px',
        borderRadius: 14,
        background: isCurrent ? tone : 'var(--card-2)',
        border: `1px solid ${isCurrent ? tone : 'var(--border)'}`,
        color: isCurrent ? '#0a0a0a' : 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        transition: 'background 150ms',
        cursor: 'pointer',
      }}
    >
      {targetState === 'disarmed' ? <Unlock size={22} strokeWidth={1.5} /> : <Shield size={22} strokeWidth={1.5} />}
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 11, opacity: 0.7 }}>{sub}</span>
    </button>
  );
}

export function AlarmCard() {
  const alarm = useEntity('alarm_control_panel.alarm_control_panel');
  const state = alarm?.state ?? 'disarmed';
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <div className='card'>
        <div className='card-h'>
          <span className='card-title'>Alarm</span>
          <button
            onClick={() => setPanelOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className={stateDotClass(state)} />
            <span style={{ fontSize: 13, color: state === 'disarmed' ? 'var(--text-3)' : 'var(--text)' }}>{stateLabel(state)}</span>
            <ChevronRight size={14} color='var(--text-3)' strokeWidth={2} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <ArmButton label='Disarm' sub='off' targetState='disarmed' currentState={state} onClick={() => alarm?.service.alarmDisarm({})} />
          <ArmButton
            label='Stay'
            sub='home'
            targetState='armed_home'
            currentState={state}
            onClick={() => alarm?.service.alarmArmHome({})}
          />
          <ArmButton
            label='Away'
            sub='full'
            targetState='armed_away'
            currentState={state}
            onClick={() => alarm?.service.alarmArmAway({})}
          />
        </div>
      </div>

      <AlarmPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
