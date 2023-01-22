import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import GestureIcon from '@mui/icons-material/Gesture';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useCallback, useEffect, useRef, useState } from 'react';
import { css, tw } from 'twind/style';
import { DefaultLayout } from './Layouts/DefaultLayout';
import DrawSettings from './components/DrawSettings';

export const DrawingApp = () => {
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
    currentTab: 'draw',
    smooth_line: true,
  });

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    window.addEventListener('resize', (e) => {
      const backupCanvas = document.createElement('canvas');
      const backupCanvasContext = backupCanvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      backupCanvas.width = canvasElement.width;
      backupCanvas.height = canvasElement.height;

      backupCanvasContext.drawImage(canvasElement, 0, 0);

      canvasElement.width = window.innerWidth / 2.5;
      canvasElement.height = (canvasElement.width * 3) / 4;

      context.drawImage(backupCanvas, 0, 0);
    });
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let coordinates: any[] = [];
    let snapshot: ImageData | null = null;
    let drawable = false;

    const onDrawingStop = () => {
      if (drawable) {
        if (coordinates.length > 1 && drawingState.smooth_line) {
          context.beginPath();
          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          if (snapshot) context.putImageData(snapshot, 0, 0);
          context.moveTo(coordinates[0].x, coordinates[0].y);

          let i;
          for (i = 1; i < coordinates.length - 2; i++) {
            const xc = (coordinates[i].x + coordinates[i + 1].x) / 2;
            const yc = (coordinates[i].y + coordinates[i + 1].y) / 2;
            context.quadraticCurveTo(
              coordinates[i].x,
              coordinates[i].y,
              xc,
              yc
            );
          }
          // curve through the last two coordinates
          context.quadraticCurveTo(
            coordinates[i].x,
            coordinates[i].y,
            coordinates[i + 1].x,
            coordinates[i + 1].y
          );

          context.stroke();
        }

        snapshot = null;
        canvasElement.style.border = 'none';
        drawable = false;
        coordinates = [];
        context.beginPath();
      }
    };

    canvasElement.onmousedown = (e) => {
      snapshot = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawable = true;
      context.moveTo(e.offsetX, e.offsetY);
      coordinates.push({ x: e.offsetX, y: e.offsetY });

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = onDrawingStop;

    canvasElement.onmouseleave = onDrawingStop;

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        coordinates.push({ x: e.offsetX, y: e.offsetY });
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    };
  }, [drawingState]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    if (drawingState.currentTab === 'eraser')
      context.globalCompositeOperation = 'destination-out';
    else context.globalCompositeOperation = 'source-over';
  }, [drawingState]);

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
                  setDrawingState((prev: any) => ({
                    ...prev,
                    currentTab: key,
                  }));
                }}
                className={tw(
                  'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
                  css({ background: 'rgba(255, 255, 255, 0.12)' }),
                  drawingState.currentTab === key && 'bg-blue-600!'
                )}
              >
                {icon}
              </button>
            ))}
          </div>

          {drawingState.currentTab === 'eraser' && (
            <div className={tw('text-white flex flex-col gap-1')}>
              <p className={tw('font-medium text-sm capitalize')}>
                stroke width
              </p>
              <input
                className={tw(
                  'px-2 py-1 rounded-md',
                  css({ background: 'rgba(255, 255, 255, 0.12)' })
                )}
                value={drawingState.width as string}
                onChange={(e) =>
                  setDrawingState((prev: any) => ({
                    ...prev,
                    width: e.target.value,
                  }))
                }
                type="text"
              />
            </div>
          )}

          {drawingState.currentTab === 'draw' && (
            <DrawSettings
              context={contextRef.current}
              canvas={canvasRef.current}
            />
          )}

          {drawingState.currentTab === 'canvas' && (
            <>
              <p>Add</p>
              <input
                multiple
                accept="image/*"
                onChange={(e) => {
                  const imageSrc = e.target.files?.item(0);

                  const imageElement = new Image();

                  if (imageSrc) {
                    imageElement.src = URL.createObjectURL(imageSrc);

                    imageElement.onload = (e) => {
                      const canvasElement = document.getElementById(
                        'canvas'
                      ) as HTMLCanvasElement;
                      const context = canvasElement.getContext(
                        '2d'
                      ) as CanvasRenderingContext2D;

                      context.drawImage(
                        imageElement,
                        0,
                        0,
                        canvasElement.width,
                        canvasElement.height
                      );
                    };
                  }
                }}
                type="file"
              />
            </>
          )}
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
