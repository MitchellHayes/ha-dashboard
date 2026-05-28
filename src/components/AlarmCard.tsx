import { useState } from 'react';
import { useEntity } from '@hakit/core';
import { Shield, Unlock, ChevronRight, Camera } from 'lucide-react';
import { AlarmPanel } from './AlarmPanel';

function getHassUrl(): string {
  try {
    const raw = localStorage.getItem('hassTokens');
    if (!raw) return '';
    const parsed = JSON.parse(raw) as { hassUrl?: string };
    return parsed.hassUrl?.replace(/\/$/, '') ?? '';
  } catch {
    return '';
  }
}

function CameraButton({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '8px 10px',
        borderRadius: 12,
        background: 'var(--card-2)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color 120ms, background 120ms',
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: 'linear-gradient(135deg, rgba(90,155,255,0.22), rgba(90,155,255,0.06))',
          border: '1px solid rgba(90,155,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--info)',
          flexShrink: 0,
        }}
      >
        <Camera size={16} strokeWidth={1.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.15 }}>{name}</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.2 }}>View camera</span>
      </div>
    </button>
  );
}

function CameraOverlay({ entityId, onClose }: { entityId: string; onClose: () => void }) {
  const camera = useEntity(entityId as `camera.${string}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraToken = (camera?.attributes as any)?.access_token as string | undefined;
  const hassUrl = getHassUrl();
  const src = hassUrl && cameraToken ? `${hassUrl}/api/camera_proxy_stream/${entityId}?token=${cameraToken}` : '';
  const label = entityId.replace(/^camera\./, '').replace(/_/g, ' ');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(82vw, 1280px)',
          aspectRatio: '16 / 9',
          background: '#000',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          position: 'relative',
          cursor: 'default',
        }}
      >
        {src ? (
          <img alt={label} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-3)',
            }}
          >
            Unable to load camera
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 14,
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.55)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

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
  const [activeCamera, setActiveCamera] = useState<string | null>(null);

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

        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <CameraButton name='Front Door' onClick={() => setActiveCamera('camera.front_door')} />
          <CameraButton name='Back Yard' onClick={() => setActiveCamera('camera.back_yard')} />
        </div>
      </div>

      <AlarmPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
      {activeCamera && <CameraOverlay entityId={activeCamera} onClose={() => setActiveCamera(null)} />}
    </>
  );
}
