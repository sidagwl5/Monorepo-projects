import { tw } from 'twind';
import SettingsOptions, { settingsOptions } from './components/SettingsOptions';
import ContentRenderer from './components/ContentRenderer';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useMeQuery } from '../../queries/user.query';
import Tooltip from 'packages/ui-lib/src/components/Tooltip';

const Dashboard = () => {
  const { me } = useMeQuery();
  const [currentOption, setCurrentOption] = useState(0);

  return (
    <div
      className={tw(
        'w-full bg-rootContainerClr h-screen p-2 flex justify-center items-center overflow-hidden'
      )}
    >
      <div className={tw('max-w-[1200px] h-full h-[90%] w-full flex gap-10')}>
        <div
          className={tw(
            'h-full border-r border-gray-700 px-2 items-center flex flex-col z-10 relative justify-between'
          )}
        >
          <Tooltip title={me.firstName}>
            <Avatar src={me.avatar_url} />
          </Tooltip>
          <SettingsOptions
            handleCurrentOption={[currentOption, setCurrentOption]}
          />
          <div />
        </div>
        <ContentRenderer currentOption={currentOption} />
      </div>
    </div>
  );
};

export default Dashboard;
