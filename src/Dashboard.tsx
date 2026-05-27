import { useState } from 'react';
import { useHass } from '@hakit/core';
import { NowStrip } from './components/NowStrip';
import { ForecastCard } from './components/ForecastCard';
import { TabbedListCard } from './components/TabbedListCard';
import { ActivityCard } from './components/ActivityCard';
import { HouseOverview } from './components/HouseOverview';
import { TimerCard } from './components/TimerCard';
import { MediaCard } from './components/MediaCard';
import { KitchenLightsCard } from './components/KitchenLightsCard';
import { QuickActionsBar } from './components/QuickActionsBar';
import { AlarmPanel } from './components/AlarmPanel';

function Dashboard() {
  const [alarmOpen, setAlarmOpen] = useState(false);

  const sunState = useHass(s => (s.entities as Record<string, { state: string }>)['sun.sun']?.state);
  const theme = sunState === 'above_horizon' ? 'light' : 'hc';

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
              <MediaCard />
              <KitchenLightsCard />
            </div>
          </div>

          <QuickActionsBar onAlarmOpen={() => setAlarmOpen(true)} />
        </div>

        <AlarmPanel open={alarmOpen} onClose={() => setAlarmOpen(false)} />
      </div>
    </div>
  );
}

export default Dashboard;
