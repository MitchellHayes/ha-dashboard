import { useEntity } from '@hakit/core';
import { Lightbulb, LightbulbOff, Droplets, Music, DoorOpen } from 'lucide-react';

export interface RoomConfig {
  name: string;
  tempEntity: string;
  humidityEntity?: string;
  motionEntity?: string;
  lightEntity: string;
  lightCount: number;
  mediaEntity?: string;
  doorEntity?: string;
}

// Deterministic sparkline path from entity ID seed
function sparkPath(seed: number, w: number, h: number): string {
  const pts: [number, number][] = [];
  let v = 0.5;
  let s = seed;
  for (let i = 0; i < 24; i++) {
    s = (s * 9301 + 49297) % 233280;
    v = Math.max(0.1, Math.min(0.9, v + (s / 233280 - 0.5) * 0.25));
    pts.push([(i / 23) * w, h - v * h]);
  }
  return 'M ' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
}
function hashStr(s: string) {
  return s.split('').reduce((a, c) => a + c.charCodeAt(0), 7);
}

export function RoomCard({ room }: { room: RoomConfig }) {
  const tempEnt = useEntity(room.tempEntity as `sensor.${string}`);
  const lightEnt = useEntity(room.lightEntity as `light.${string}`);
  const motionEnt = useEntity((room.motionEntity ?? 'binary_sensor.kitchen_motion') as `binary_sensor.${string}`, {
    returnNullIfNotFound: true,
  });
  const mediaEnt = useEntity((room.mediaEntity ?? 'media_player.kitchen_speaker') as `media_player.${string}`, {
    returnNullIfNotFound: true,
  });
  const doorEnt = useEntity((room.doorEntity ?? 'binary_sensor.front_door_entry') as `binary_sensor.${string}`, {
    returnNullIfNotFound: true,
  });

  const temp = parseFloat(tempEnt?.state ?? '0');
  const isLightOn = lightEnt?.state === 'on';
  const brightness = isLightOn ? Math.round((((lightEnt?.attributes?.brightness as number) ?? 255) / 255) * 100) : 0;
  const occupied = room.motionEntity ? motionEnt?.state === 'on' : false;
  const isPlaying = room.mediaEntity ? mediaEnt?.state === 'playing' : false;
  const isDoorOpen = room.doorEntity ? doorEnt?.state === 'on' : false;
  const path = sparkPath(hashStr(room.lightEntity), 220, 32);

  function toggleLight(e: React.MouseEvent) {
    e.stopPropagation();
    lightEnt?.service.toggle();
  }

  const tempStr = isNaN(temp) || temp === 0 ? '—' : temp.toFixed(1);

  return (
    <div className={`room${occupied ? ' occupied' : ''}`}>
      {/* Header */}
      <div className='between'>
        <div className='col-flex'>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{room.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {occupied ? 'Occupied now' : 'Unoccupied'}
          </div>
        </div>
        <div className={`dot${occupied ? ' live' : ''}`} />
      </div>

      {/* Hero temp */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span className='mono' style={{ fontSize: 'var(--sz-room-temp)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            {tempStr}
          </span>
          <span
            style={{
              fontSize: 'clamp(18px, 1.45vw, 28px)',
              color: 'var(--text-2)',
              fontWeight: 300,
              marginLeft: -2,
              alignSelf: 'flex-start',
              lineHeight: 1,
              transform: 'translateY(6px)',
            }}
          >
            °
          </span>
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-3)', display: 'flex', gap: 12, alignItems: 'center' }}>
          {room.humidityEntity && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Droplets size={11} />
              {/* humidity rendered by parent if wired */}
            </span>
          )}
          {room.doorEntity && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <DoorOpen size={11} /> {isDoorOpen ? 'open' : 'closed'}
            </span>
          )}
          {isPlaying && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent-2)' }}>
              <Music size={11} /> playing
            </span>
          )}
        </div>

        {/* Sparkline */}
        <svg viewBox='0 0 220 36' preserveAspectRatio='none' style={{ width: '100%', height: 36, marginTop: 4, opacity: 0.65 }}>
          <path d={path} fill='none' stroke='var(--text-3)' strokeWidth='1.5' strokeLinejoin='round' strokeLinecap='round' />
        </svg>
      </div>

      <div className='divider' />

      {/* Lights row */}
      <button
        onClick={toggleLight}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 0',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isLightOn ? (
            <Lightbulb size={20} color='var(--accent)' strokeWidth={1.5} />
          ) : (
            <LightbulbOff size={20} color='var(--text-3)' strokeWidth={1.5} />
          )}
          <div className='col-flex'>
            <span style={{ fontSize: 15, fontWeight: 500 }}>
              {isLightOn
                ? `${room.lightCount} light${room.lightCount !== 1 ? 's' : ''} on`
                : `${room.lightCount} light${room.lightCount !== 1 ? 's' : ''} off`}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>
              {isLightOn ? (brightness > 0 ? `${brightness}% · tap off` : 'tap to turn off') : 'tap to turn on'}
            </span>
          </div>
        </div>
        <div className={`switch${isLightOn ? ' on' : ''}`} />
      </button>
    </div>
  );
}
