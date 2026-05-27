import { useState } from 'react';
import { useHass } from '@hakit/core';
import { NowStrip } from './components/NowStrip';
import { ForecastCard } from './components/ForecastCard';
import { TabbedListCard } from './components/TabbedListCard';
import { ActivityCard } from './components/ActivityCard';
import { HouseOverview } from './components/HouseOverview';
import { TimerCard } from './components/TimerCard';
import { MediaCard } from './components/MediaCard';
import { QuickActionsBar } from './components/QuickActionsBar';
import { AlarmPanel } from './components/AlarmPanel';
import { BrowsePanel } from './components/BrowsePanel';

function Dashboard() {
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [browseEntityId, setBrowseEntityId] = useState('media_player.kitchen_speaker_2');
  const [browseDeviceName, setBrowseDeviceName] = useState('Kitchen');
  const [browseOpen, setBrowseOpen] = useState(false);

  const sunState = useHass(s => (s.entities as Record<string, { state: string }>)['sun.sun']?.state);
  const theme = sunState === 'above_horizon' ? 'light' : 'hc';

  function openBrowse(entityId: string, deviceName: string) {
    setBrowseEntityId(entityId);
    setBrowseDeviceName(deviceName);
    setBrowseOpen(true);
  }

  return (
    <div className='pulse-stage'>
      <div className='pulse-screen' data-theme={theme}>
        <div className='pulse-grid'>
          <NowStrip />

          <div className='pulse-main'>
            <div className='col'>
              <ForecastCard />
              <TabbedListCard />
              <ActivityCard />
            </div>

            <HouseOverview />

            <div className='col'>
              <TimerCard />
              <MediaCard onBrowseOpen={openBrowse} />
            </div>
          </div>

          <QuickActionsBar onAlarmOpen={() => setAlarmOpen(true)} />
        </div>

        <AlarmPanel open={alarmOpen} onClose={() => setAlarmOpen(false)} />
        <BrowsePanel open={browseOpen} onClose={() => setBrowseOpen(false)} entityId={browseEntityId} deviceName={browseDeviceName} />
      </div>
    </div>
  );
}

export default Dashboard;
