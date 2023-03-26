import { settingsOptions } from './SettingsOptions';

const ContentRenderer = ({ currentOption }) => {
  return settingsOptions[currentOption].component;
};

export default ContentRenderer;
