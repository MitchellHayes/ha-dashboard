import { useEntity } from '@hakit/core';
import { DoorOpen, Move, User, Shield, Lightbulb } from 'lucide-react';

interface ActivityEntry {
  icon: React.ReactNode;
  text: string;
  where: string;
  lastChanged: Date;
}

function relTime(d: Date): string {
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function alarmLabel(state: string): string {
  if (state === 'armed_away') return 'Alarm armed · Away';
  if (state === 'armed_home') return 'Alarm armed · Home';
  if (state === 'disarmed') return 'Alarm disarmed';
  if (state === 'triggered') return 'Alarm triggered';
  return `Alarm ${state}`;
}

export function ActivityCard() {
  const frontDoor = useEntity('binary_sensor.front_door_entry');
  const backDoor = useEntity('binary_sensor.back_door_entry');
  const kitchenMotion = useEntity('binary_sensor.kitchen_motion');
  const masterMotion = useEntity('binary_sensor.master_bedroom_motion');
  const gameMotion = useEntity('binary_sensor.gym_motion');
  const mitchell = useEntity('person.mitchell');
  const michelle = useEntity('person.michelle');
  const ryan = useEntity('person.ryan');
  const alarm = useEntity('alarm_control_panel.alarm_control_panel');
  const livingRoomLight = useEntity('light.living_room_main_lights');
  const kitchenLight = useEntity('light.kitchen_lights');
  const masterLight = useEntity('light.master_bedroom');
  const gameRoomLight = useEntity('light.family_room_main_lights');
  const ryansRoomLight = useEntity('light.ryan_s_ceiling_fan_2');
  const storageLight = useEntity('light.office_ceiling_fan');

  const entries: ActivityEntry[] = [
    {
      icon: <DoorOpen size={13} />,
      text: frontDoor.state === 'on' ? 'Front door opened' : 'Front door closed',
      where: 'Front door',
      lastChanged: new Date(frontDoor.last_changed ?? 0),
    },
    {
      icon: <DoorOpen size={13} />,
      text: backDoor.state === 'on' ? 'Back door opened' : 'Back door closed',
      where: 'Back door',
      lastChanged: new Date(backDoor.last_changed ?? 0),
    },
    {
      icon: <Move size={13} />,
      text: 'Motion detected',
      where: 'Kitchen',
      lastChanged: new Date(kitchenMotion.last_changed ?? 0),
    },
    {
      icon: <Move size={13} />,
      text: 'Motion detected',
      where: 'Master bedroom',
      lastChanged: new Date(masterMotion.last_changed ?? 0),
    },
    {
      icon: <Move size={13} />,
      text: 'Motion detected',
      where: 'Game room',
      lastChanged: new Date(gameMotion.last_changed ?? 0),
    },
    {
      icon: <User size={13} />,
      text: mitchell.state === 'home' ? 'Mitchell arrived' : 'Mitchell left',
      where: 'Mitchell',
      lastChanged: new Date(mitchell.last_changed ?? 0),
    },
    {
      icon: <User size={13} />,
      text: michelle.state === 'home' ? 'Michelle arrived' : 'Michelle left',
      where: 'Michelle',
      lastChanged: new Date(michelle.last_changed ?? 0),
    },
    {
      icon: <User size={13} />,
      text: ryan.state === 'home' ? 'Ryan arrived' : 'Ryan left',
      where: 'Ryan',
      lastChanged: new Date(ryan.last_changed ?? 0),
    },
    {
      icon: <Shield size={13} />,
      text: alarmLabel(alarm.state ?? ''),
      where: 'Security',
      lastChanged: new Date(alarm.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: livingRoomLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: 'Living room',
      lastChanged: new Date(livingRoomLight.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: kitchenLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: 'Kitchen',
      lastChanged: new Date(kitchenLight.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: masterLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: 'Master bedroom',
      lastChanged: new Date(masterLight.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: gameRoomLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: 'Game room',
      lastChanged: new Date(gameRoomLight.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: ryansRoomLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: "Ryan's room",
      lastChanged: new Date(ryansRoomLight.last_changed ?? 0),
    },
    {
      icon: <Lightbulb size={13} />,
      text: storageLight.state === 'on' ? 'Lights on' : 'Lights off',
      where: 'Storage room',
      lastChanged: new Date(storageLight.last_changed ?? 0),
    },
  ]
    .filter(e => e.lastChanged.getTime() > 0)
    .sort((a, b) => b.lastChanged.getTime() - a.lastChanged.getTime())
    .slice(0, 4);

  return (
    <div className='card' style={{ flexShrink: 0 }}>
      <div className='card-h'>
        <span className='card-title'>Recent activity</span>
        <span className='card-action' style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className='dot live' /> live
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {entries.length === 0 ? (
          <div style={{ fontSize: 15, color: 'var(--text-3)', fontStyle: 'italic' }}>No recent activity.</div>
        ) : (
          entries.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'var(--card-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-2)',
                  flexShrink: 0,
                }}
              >
                {e.icon}
              </div>
              <div className='col-flex grow' style={{ minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {e.text}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{e.where}</span>
              </div>
              <span className='mono' style={{ fontSize: 13, color: 'var(--text-3)', flexShrink: 0 }}>
                {relTime(e.lastChanged)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
