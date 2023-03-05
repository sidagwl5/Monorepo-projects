import { tw } from 'twind';
import SettingsOptions from './components/SettingsOptions';
import ContentRenderer from './components/ContentRenderer';

const Dashboard = () => {
  return (
    <div className={tw('w-full h-screen p-2 overflow-hidden flex gap-2')}>
      <div className={tw('h-full flex flex-col z-10 relative justify-center')}>
        <SettingsOptions />
      </div>
      <ContentRenderer />
    </div>
  );
};

export default Dashboard;
