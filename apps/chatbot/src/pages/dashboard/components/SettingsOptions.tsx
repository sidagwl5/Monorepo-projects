import { tw } from 'twind/style';
import { IconButton, settingsSvg } from 'ui-lib';
import messageSvg from '../../../assets/svgs/message.svg';

const settingsOptions = [
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
    key: 'settings',
    tooltipProps: {
      title: 'Messages',
    },
  },
];

const SettingsOptions = () => {
  const handleOptionClick = () => {};

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {settingsOptions.map(({ icon, key, component, ...rest }) => (
        <IconButton key={key} onClick={handleOptionClick} {...rest}>
          <img src={icon} alt={rest.title} />
        </IconButton>
      ))}
    </div>
  );
};

export default SettingsOptions;
