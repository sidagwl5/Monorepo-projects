import { tw } from 'twind/style';
import { IconButton, notificationsSvg, settingsSvg } from 'ui-lib';
import messageSvg from '../../../assets/svgs/message.svg';

const settingsOptions = [
  {
    title: 'Notifications',
    icon: notificationsSvg,
    key: 'notifications',
    tooltipProps: {
      title: 'Notifications',
    },
  },
  {
    title: 'Settings',
    icon: settingsSvg,
    key: 'settings',
    tooltipProps: {
      title: 'Settings',
    },
  },
  {
    title: 'Messages',
    icon: messageSvg,
    key: 'messages',
    tooltipProps: {
      title: 'Messages',
    },
  },
];

const SettingsOptions = () => {
  const handleOptionClick = () => {};

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {settingsOptions.map(({ icon, key, component, title, ...rest }) => (
        <IconButton key={key} onClick={handleOptionClick} {...rest}>
          <img src={icon} alt={title} />
        </IconButton>
      ))}
    </div>
  );
};

export default SettingsOptions;
