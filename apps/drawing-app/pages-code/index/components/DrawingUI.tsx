import { tw } from 'twind';
import ToolOptions from './ToolOptions';
import UtilityOptions from './UtilityOptions';
import CanvasLayout from './CanvasLayout';
import SettingsOptions from './SettingsOptions';
import { FullScreenOptions } from './FullscreenOptions';

const DrawingUI = () => {
  return (
    <div className={tw('w-full h-full overflow-hidden relative flex gap-2')}>
      <div
        className={tw(
          'h-full flex flex-col left-0 top-0 absolute z-10 relative justify-between'
        )}
      >
        <SettingsOptions />
        <ToolOptions />
        <FullScreenOptions />
      </div>
      <CanvasLayout />
      <div
        className={tw(
          'h-full flex flex-col absolute right-0 top-0 z-10 relative justify-center items-center'
        )}
      >
        <UtilityOptions />
      </div>
    </div>
  );
};

export default DrawingUI;
