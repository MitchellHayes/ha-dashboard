import { RefreshCw } from 'lucide-react';
import { RoomCard, type RoomConfig } from './RoomCard';

const ROOMS: RoomConfig[] = [
  {
    name: 'Living Room',
    tempEntity: 'sensor.thermostat_temperature',
    humidityEntity: 'sensor.thermostat_humidity',
    lightEntity: 'light.living_room_main_lights',
    lightCount: 2,
    mediaEntity: undefined,
  },
  {
    name: 'Kitchen',
    tempEntity: 'sensor.thermostat_temperature',
    motionEntity: 'binary_sensor.kitchen_motion',
    lightEntity: 'light.kitchen_lights',
    lightCount: 3,
    mediaEntity: 'media_player.kitchen_speaker',
  },
  {
    name: 'Master Bedroom',
    tempEntity: 'sensor.master_bedroom_temperature_2',
    motionEntity: 'binary_sensor.master_bedroom_motion',
    lightEntity: 'light.master_bedroom',
    lightCount: 3,
  },
  {
    name: 'Game Room',
    tempEntity: 'sensor.gym_temperature',
    motionEntity: 'binary_sensor.gym_motion',
    lightEntity: 'light.family_room_main_lights',
    lightCount: 4,
    mediaEntity: 'media_player.family_room_2',
  },
  {
    name: "Ryan's Room",
    tempEntity: 'sensor.ryan_s_room_temperature_2',
    motionEntity: 'binary_sensor.ryan_s_room_motion',
    lightEntity: 'light.ryan_s_ceiling_fan_2',
    lightCount: 1,
  },
  {
    name: 'Storage Room',
    tempEntity: 'sensor.game_room_temperature_2',
    motionEntity: 'binary_sensor.game_room_motion',
    lightEntity: 'light.office_ceiling_fan',
    lightCount: 1,
  },
];

export function HouseOverview() {
  return (
    <div className='card grow' style={{ padding: 20 }}>
      <div className='card-h' style={{ marginBottom: 12 }}>
        <span className='card-title'>House overview</span>
        <span className='card-action'>
          <RefreshCw size={12} /> synced live
        </span>
      </div>
      <div
        className='grow'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 14,
        }}
      >
        {ROOMS.map(r => (
          <RoomCard key={r.name} room={r} />
        ))}
      </div>
    </div>
  );
}
