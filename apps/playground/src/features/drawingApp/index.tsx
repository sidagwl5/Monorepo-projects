import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import GestureIcon from '@mui/icons-material/Gesture';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useCallback, useEffect, useRef, useState } from 'react';
import { css, tw } from 'twind/style';
import { DefaultLayout } from './Layouts/DefaultLayout';
import DrawSettings from './components/DrawSettings';
import { useInitializeCanvas } from './hooks/useInitializeCanvas';
import { useDrawingContext } from './Context';
import { EraserSettings } from './components/EraserSettings';
import { CanvasSettings } from './components/CanvasSettings';

export const DrawingApp = () => {
  const { setCurrentTab, currentTab } = useDrawingContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tabOptions = [
    {
      title: 'Draw',
      key: 'draw',
      icon: <GestureIcon className={tw('text-[20px]!')} />,
    },
    {
      title: 'Eraser',
      key: 'eraser',
      icon: <DriveFileRenameOutlineIcon className={tw('text-[20px]!')} />,
    },
    {
      title: 'Canvas',
      key: 'canvas',
      icon: <DashboardIcon className={tw('text-[20px]!')} />,
    },
  ];

  const [drawingState, setDrawingState] = useState<any>({
    width: 1,
  });

  useInitializeCanvas();

  const reset = () => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  };

  return (
    <DefaultLayout
      left={
        <>
          <div className={tw('w-full flex gap-2')}>
            {tabOptions.map(({ icon, key, title }) => (
              <button
                onClick={() => {
                  setCurrentTab(key);
                }}
                className={tw(
                  'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
                  css({ background: 'rgba(255, 255, 255, 0.12)' }),
                  currentTab === key && 'bg-blue-600!'
                )}
              >
                {icon}
              </button>
            ))}
          </div>

          {currentTab === 'eraser' && <EraserSettings />}

          {currentTab === 'draw' && (
            <DrawSettings
              context={contextRef.current}
              canvas={canvasRef.current}
            />
          )}

          {currentTab === 'canvas' && <CanvasSettings />}
        </>
      }
      content={
        <canvas
          ref={useCallback((_ref: HTMLCanvasElement | null) => {
            if (_ref) {
              canvasRef.current = _ref;
              contextRef.current = _ref?.getContext('2d', {
                willReadFrequently: true,
              });
            }
          }, [])}
          className={tw(
            css({
              transition: '0.3s all ease-out',
              background: 'rgba(255, 255, 255, 0.08)',
            })
          )}
          id="canvas"
        />
      }
      right={
        <>
          <button
            onClick={() => {
              const canvasElement = document.getElementById(
                'canvas'
              ) as HTMLCanvasElement;

              const imageURI = canvasElement.toDataURL('image/jpeg', 1);

              const anchorElement = document.createElement('a');
              anchorElement.href = imageURI;
              anchorElement.download = 'Drawing.jpeg';

              anchorElement.click();
            }}
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 bg-green-500 ml-auto flex items-center justify-center outline-none!'
            )}
          >
            <DownloadIcon className={tw('text-[20px]!')} />
          </button>
          <button
            onClick={reset}
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 bg-red-500 ml-auto flex items-center justify-center outline-none!'
            )}
          >
            <RestartAltIcon className={tw('text-[20px]!')} />
          </button>
        </>
      }
    />
  );
};

export default DrawingApp;
