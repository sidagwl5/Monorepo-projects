import { tw } from 'twind';
import ToolOptions from './ToolOptions';
import UtilityOptions from './UtilityOptions';
import CanvasLayout from './CanvasLayout';
import SettingsOptions from './SettingsOptions';
import { FullScreenOptions } from './FullscreenOptions';

const DrawingUI = () => {
  return (
    <div className={tw('w-full h-full overflow-hidden relative flex gap-2')}>
      <CanvasLayout />

      <SettingsOptions />
      <ToolOptions />
      <FullScreenOptions />
      <UtilityOptions />
    </div>
  );
};

export default DrawingUI;
