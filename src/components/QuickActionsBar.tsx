import { useEntity } from '@hakit/core';
import { LightbulbOff, Shield, DoorOpen } from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick: () => void;
  tone?: 'ok' | 'warm' | 'alert' | null;
}

const TONES = {
  ok: { bg: 'rgba(107,191,117,0.14)', border: 'rgba(107,191,117,0.4)', iconBg: 'var(--ok)', iconFg: '#0a1f0d' },
  warm: { bg: 'var(--accent-dim)', border: 'rgba(245,166,35,0.4)', iconBg: 'var(--accent)', iconFg: '#1a1100' },
  alert: { bg: 'rgba(232,93,79,0.14)', border: 'rgba(232,93,79,0.4)', iconBg: 'var(--alert)', iconFg: '#1a0a08' },
};

function QuickAction({ icon, label, sub, onClick, tone }: QuickActionProps) {
  const t = tone ? TONES[tone] : null;
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        height: '100%',
        borderRadius: 16,
        background: t ? t.bg : 'var(--card)',
        border: `1px solid ${t ? t.border : 'var(--border)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '0 24px',
        transition: 'background 150ms, border-color 150ms, transform 80ms',
      }}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.99)')}
      onMouseUp={e => (e.currentTarget.style.transform = '')}
      onMouseLeave={e => (e.currentTarget.style.transform = '')}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: t ? t.iconBg : 'var(--card-2)',
          color: t ? t.iconFg : 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div className='col-flex' style={{ alignItems: 'flex-start', minWidth: 0 }}>
        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{label}</span>
        <span
          style={{
            fontSize: 14,
            color: 'var(--text-3)',
            marginTop: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {sub}
        </span>
      </div>
    </button>
  );
}

interface QuickActionsBarProps {
  onAlarmOpen: () => void;
}

export function QuickActionsBar({ onAlarmOpen }: QuickActionsBarProps) {
  const allLights = useEntity('light.all_lights');
  const alarm = useEntity('alarm_control_panel.alarm_control_panel');
  const frontDoor = useEntity('binary_sensor.front_door_entry');

  const alarmState = alarm?.state ?? 'disarmed';
  const doorOpen = frontDoor?.state === 'on';

  const alarmLabel =
    alarmState === 'disarmed'
      ? 'Alarm off'
      : alarmState === 'armed_home'
        ? 'Armed · Home'
        : alarmState === 'armed_away'
          ? 'Armed · Away'
          : alarmState === 'triggered'
            ? 'TRIGGERED'
            : 'Alarm';

  const alarmSub =
    alarmState === 'disarmed'
      ? 'tap to arm'
      : alarmState === 'armed_home'
        ? 'perimeter only'
        : alarmState === 'armed_away'
          ? 'full arm'
          : '';

  const alarmTone: 'ok' | 'warm' | 'alert' | null =
    alarmState === 'disarmed' ? null : alarmState === 'armed_away' || alarmState === 'triggered' ? 'alert' : 'warm';

  return (
    <div style={{ display: 'flex', gap: 14, height: '100%' }}>
      <QuickAction
        icon={<LightbulbOff size={24} strokeWidth={1.5} />}
        label='All lights off'
        sub='every room'
        onClick={() => allLights?.service.turnOff()}
      />
      <QuickAction icon={<Shield size={24} strokeWidth={1.5} />} label={alarmLabel} sub={alarmSub} onClick={onAlarmOpen} tone={alarmTone} />
      <QuickAction
        icon={<DoorOpen size={24} strokeWidth={1.5} />}
        label='Front door'
        sub={doorOpen ? 'open now' : 'closed'}
        onClick={() => {}}
        tone={doorOpen ? 'alert' : null}
      />
    </div>
  );
}
