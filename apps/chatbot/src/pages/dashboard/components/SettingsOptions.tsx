import { tw } from 'twind/style';
import { IconButton, settingsSvg } from 'ui-lib';
import messageSvg from '../../../assets/svgs/message.svg';
import Messages from './Messages';
import Settings from './Settings';

export const settingsOptions = [
  // {
  //   title: 'Notifications',
  //   icon: notificationsSvg,
  //   key: 'notifications',
  //   tooltipProps: {
  //     title: 'Notifications',
  //   },
  // },
  {
    title: 'Messages',
    icon: messageSvg,
    key: 'messages',
    tooltipProps: {
      title: 'Messages',
    },
    component: <Messages />,
  },
  {
    title: 'Settings',
    icon: settingsSvg,
    key: 'settings',
    tooltipProps: {
      title: 'Settings',
    },
    component: <Settings />,
  },
];

const SettingsOptions = ({ handleCurrentOption }) => {
  const [currentOption, setCurrentOption] = handleCurrentOption;

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {settingsOptions.map(({ icon, key, component, title, ...rest }, idx) => (
        <IconButton
          active={idx === currentOption}
          key={key}
          onClick={setCurrentOption.bind(this, idx)}
          {...rest}
        >
          <img
            className={tw(idx === currentOption && 'invert filter')}
            src={icon}
            alt={title}
          />
        </IconButton>
      ))}
    </div>
  );
};

export default SettingsOptions;
