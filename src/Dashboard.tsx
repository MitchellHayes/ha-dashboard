import { useState } from 'react';
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

  return (
    <div className='pulse-stage'>
      <div className='pulse-screen'>
        <div className='pulse-grid'>
          {/* Top strip */}
          <NowStrip />

          {/* Main row */}
          <div className='pulse-main'>
            {/* Left column */}
            <div className='col'>
              <ForecastCard />
              <TabbedListCard />
              <ActivityCard />
            </div>

            {/* Center: house overview */}
            <HouseOverview />

            {/* Right column */}
            <div className='col'>
              <TimerCard />
              <MediaCard />
              <KitchenLightsCard />
            </div>
          </div>

          {/* Bottom bar */}
          <QuickActionsBar onAlarmOpen={() => setAlarmOpen(true)} />
        </div>

        {/* Alarm overlay */}
        <AlarmPanel open={alarmOpen} onClose={() => setAlarmOpen(false)} />
      </div>
    </div>
  );
}

export default Dashboard;
