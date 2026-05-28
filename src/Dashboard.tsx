import { useHass } from '@hakit/core';
import { NowStrip } from './components/NowStrip';
import { ForecastCard } from './components/ForecastCard';
import { TabbedListCard } from './components/TabbedListCard';
import { ActivityCard } from './components/ActivityCard';
import { HouseOverview } from './components/HouseOverview';
import { AlarmCard } from './components/AlarmCard';
import { MediaCard } from './components/MediaCard';

function Dashboard() {
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
              <AlarmCard />
              <MediaCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
