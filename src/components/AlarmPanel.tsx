import { useEntity } from '@hakit/core';
import { X, Shield, Unlock, DoorOpen } from 'lucide-react';

const DOOR_SENSORS = [
  { entityId: 'binary_sensor.front_door_entry', name: 'Front door', type: 'door' },
  { entityId: 'binary_sensor.back_door_entry', name: 'Back door', type: 'door' },
  { entityId: 'binary_sensor.garage_entry', name: 'Garage entry', type: 'door' },
  { entityId: 'binary_sensor.patio_window_entry', name: 'Patio window', type: 'window' },
] as const;

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

interface ArmButtonProps {
  label: string;
  targetState: AlarmState;
  currentState: string;
  onClick: () => void;
}

function ArmButton({ label, targetState, currentState, onClick }: ArmButtonProps) {
  const isCurrent = currentState === targetState;
  const tone = targetState === 'armed_away' ? 'var(--alert)' : targetState === 'armed_home' ? 'var(--accent)' : 'var(--ok)';
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '20px 16px',
        borderRadius: 16,
        background: isCurrent ? tone : 'var(--card-2)',
        border: `1px solid ${isCurrent ? tone : 'var(--border-2)'}`,
        color: isCurrent ? '#0a0a0a' : 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transition: 'background 150ms',
        cursor: 'pointer',
      }}
    >
      {targetState === 'disarmed' ? <Unlock size={28} strokeWidth={1.5} /> : <Shield size={28} strokeWidth={1.5} />}
      <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

function SensorRow({ entityId, name }: { entityId: string; name: string }) {
  const sensor = useEntity(entityId as `binary_sensor.${string}`);
  const isOpen = sensor?.state === 'on';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        background: 'var(--card-2)',
        borderRadius: 10,
        border: `1px solid ${isOpen ? 'rgba(232,93,79,0.3)' : 'var(--border)'}`,
      }}
    >
      <DoorOpen size={16} color={isOpen ? 'var(--alert)' : 'var(--text-3)'} strokeWidth={1.5} />
      <span style={{ fontSize: 14, flex: 1 }}>{name}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isOpen ? 'var(--alert)' : 'var(--text-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {isOpen ? 'open' : 'closed'}
      </span>
    </div>
  );
}

interface AlarmPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AlarmPanel({ open, onClose }: AlarmPanelProps) {
  const alarm = useEntity('alarm_control_panel.alarm_control_panel');
  const state = alarm?.state ?? 'disarmed';

  const frontDoor = useEntity('binary_sensor.front_door_entry');
  const backDoor = useEntity('binary_sensor.back_door_entry');
  const garageEntry = useEntity('binary_sensor.garage_entry');
  const patioWindow = useEntity('binary_sensor.patio_window_entry');

  const openSensors = [frontDoor, backDoor, garageEntry, patioWindow].filter(s => s?.state === 'on').length;

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 180ms ease',
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border-2)',
          borderRadius: 24,
          padding: 32,
          width: 620,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div className='between' style={{ marginBottom: 24 }}>
          <div className='col-flex'>
            <span className='label'>Alarm panel</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
              <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }}>{stateLabel(state)}</span>
              <span
                className={`dot${state === 'disarmed' ? ' ok' : state === 'triggered' ? ' alert' : state === 'armed_away' ? ' alert' : ' on'}`}
              />
            </div>
          </div>
          <button className='ibtn' onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Arm buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <ArmButton label='Disarm' targetState='disarmed' currentState={state} onClick={() => alarm?.service.alarmDisarm({})} />
          <ArmButton label='Home' targetState='armed_home' currentState={state} onClick={() => alarm?.service.alarmArmHome({})} />
          <ArmButton label='Away' targetState='armed_away' currentState={state} onClick={() => alarm?.service.alarmArmAway({})} />
        </div>

        {/* Sensors */}
        <div className='label' style={{ marginBottom: 10 }}>
          Sensors
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {DOOR_SENSORS.map(s => (
            <SensorRow key={s.entityId} entityId={s.entityId} name={s.name} />
          ))}
        </div>

        {openSensors > 0 && state !== 'disarmed' && (
          <div
            style={{ marginTop: 16, padding: 12, background: 'rgba(232,93,79,0.1)', borderRadius: 10, fontSize: 13, color: 'var(--alert)' }}
          >
            ⚠ {openSensors} sensor{openSensors > 1 ? 's' : ''} open — alarm may not fully arm
          </div>
        )}
      </div>
    </div>
  );
}
