import { tw } from 'twind';
import ToolOptions from './ToolOptions';
import UtilityOptions from './UtilityOptions';
import CanvasLayout from './CanvasLayout';
import SettingsOptions from './SettingsOptions';

const DrawingUI = () => {
  return (
    <div className={tw('w-full h-screen p-2 overflow-hidden flex gap-2')}>
      <div className={tw('h-full flex flex-col z-10 relative justify-center')}>
        <ToolOptions />
      </div>
      <CanvasLayout />
      <div
        className={tw(
          'h-full flex flex-col z-10 relative justify-between items-center'
        )}
      >
        <SettingsOptions />
        <UtilityOptions />
      </div>
    </div>
  );
};

export default DrawingUI;
