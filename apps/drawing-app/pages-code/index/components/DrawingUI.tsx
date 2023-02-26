import { tw } from 'twind';
import ToolOptions from './ToolOptions';
import CanvasLayout from './CanvasLayout';

const DrawingUI = () => {
  return (
    <div className={tw('w-full h-screen p-2 flex gap-2')}>
      <ToolOptions />
      {/* <CanvasLayout /> */}
    </div>
  );
};

export default DrawingUI;
