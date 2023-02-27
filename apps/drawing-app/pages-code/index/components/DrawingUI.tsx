import { tw } from 'twind';
import ToolOptions from './ToolOptions';
import UtilityOptions from './UtilityOptions';
import CanvasLayout from './CanvasLayout';

const DrawingUI = () => {
  return (
    <div className={tw('w-full h-screen p-2 flex gap-2')}>
      <div className={tw('h-full flex flex-col justify-between items-center')}>
        <div />
        <ToolOptions />
        <UtilityOptions />
      </div>
      <CanvasLayout />
    </div>
  );
};

export default DrawingUI;
