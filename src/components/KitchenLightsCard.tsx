import { useEntity } from '@hakit/core';
import { Lightbulb, LightbulbOff } from 'lucide-react';

interface LightTileProps {
  entityId: string;
  name: string;
}

function LightTile({ entityId, name }: LightTileProps) {
  const light = useEntity(entityId as `light.${string}`);
  const isOn = light?.state === 'on';
  const brightness = isOn ? Math.round((((light?.attributes?.brightness as number) ?? 255) / 255) * 100) : 0;

  return (
    <div className={`lt${isOn ? ' on' : ''}`} onClick={() => light?.service.toggle()}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {isOn ? (
          <Lightbulb size={20} color='var(--accent)' strokeWidth={1.5} />
        ) : (
          <LightbulbOff size={20} color='var(--text-3)' strokeWidth={1.5} />
        )}
        <div className={`dot${isOn ? ' on' : ''}`} />
      </div>
      <div>
        <div className='lt-name'>{name}</div>
        <div className='lt-sub'>{isOn ? `${brightness}%` : 'Off'}</div>
      </div>
    </div>
  );
}

const KITCHEN_LIGHTS = [
  { entityId: 'light.kitchen_main_lights_1', name: 'Main' },
  { entityId: 'light.kitchen_sink', name: 'Sink' },
  { entityId: 'light.dining_room_chandelier', name: 'Dining' },
];

export function KitchenLightsCard() {
  const groupLight = useEntity('light.kitchen_and_dining_room_lights');
  const anyOn = groupLight?.state === 'on';

  function toggleAll() {
    if (anyOn) {
      groupLight?.service.turnOff();
    } else {
      groupLight?.service.turnOn();
    }
  }

  return (
    <div className='card grow'>
      <div className='card-h'>
        <span className='card-title'>Kitchen lights</span>
        <button onClick={toggleAll} className={`pill${anyOn ? ' on' : ''}`} style={{ cursor: 'pointer' }}>
          {anyOn ? 'All off' : 'All on'}
        </button>
      </div>
      <div
        className='grow'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {KITCHEN_LIGHTS.map(l => (
          <LightTile key={l.entityId} entityId={l.entityId} name={l.name} />
        ))}
      </div>
    </div>
  );
}
