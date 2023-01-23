import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { css, tw } from 'twind/style';

export const BackgroundColorBehindElements = () => {
  const [drawingState, setDrawingState] = useState<any>({
    width: 1,
    color: 'white',
    eraser: false,
    paint: true,
  });

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;

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

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    context.globalCompositeOperation = 'source-over';

    context.fillStyle = 'blue';
    context.fillRect(50, 50, 100, 50);

    context.fillStyle = 'green';
    context.fillRect(150, 150, 100, 50);

    context.globalCompositeOperation = 'destination-over';

    context.fillStyle = drawingState.color;
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }, [drawingState.color]);

  const reset = () => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  };

  return (
    <div
      className={tw(
        'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
      )}
    >
      <div
        className={tw(
          'h-full max-w-[250px] w-full p-4 flex flex-col gap-5',
          css({ background: 'rgba(255, 255, 255, 0.15)' })
        )}
      >
        <p className={tw('text-white font-semibold')}>Background Color</p>
        {drawingState.paint && (
          <div className={tw('w-full flex gap-2')}>
            {['green', 'blue', 'red', 'pink', 'yellow'].map((color) => (
              <Tooltip arrow title={color} disableInteractive placement="top">
                <div className={tw('relative cursor-pointer')}>
                  {color === drawingState.color && (
                    <div
                      onClick={() => {
                        setDrawingState((prev: any) => ({
                          ...prev,
                          color,
                        }));
                      }}
                      className={tw(
                        'w-6 h-6 rounded-full flex items-center justify-center absolute top-0 left-0',
                        css({ background: 'rgba(0, 0, 0, 0.2)' })
                      )}
                    >
                      <DoneIcon className={tw('text-white text-[16px]!')} />
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setDrawingState((prev: any) => ({
                        ...prev,
                        color,
                      }));
                    }}
                    className={tw('w-6 h-6 rounded-full', `bg-${color}-400`)}
                  />
                </div>
              </Tooltip>
            ))}

            <Tooltip arrow title={'white'} disableInteractive placement="top">
              <div className={tw('relative cursor-pointer')}>
                {'white' === drawingState.color && (
                  <div
                    onClick={() => {
                      setDrawingState((prev: any) => ({
                        ...prev,
                        color: 'white',
                      }));
                    }}
                    className={tw(
                      'w-6 h-6 rounded-full flex items-center justify-center absolute top-0 left-0',
                      css({ background: 'rgba(0, 0, 0, 0.2)' })
                    )}
                  >
                    <DoneIcon className={tw('text-white text-[16px]!')} />
                  </div>
                )}
                <div
                  onClick={() => {
                    setDrawingState((prev: any) => ({
                      ...prev,
                      color: 'white',
                    }));
                  }}
                  className={tw('w-6 h-6 rounded-full', `bg-white`)}
                />
              </div>
            </Tooltip>
          </div>
        )}

        <button
          className={tw(
            'bg-red-500 justify-end text-white py-1 mt-auto rounded-md'
          )}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div
        className={tw(
          'h-full flex-1 flex justify-center items-center',
          css({ background: '#1b1b1b' })
        )}
      >
        <canvas
          className={tw(
            css({
              transition: '0.3s all ease-out',
              background: 'rgba(255, 255, 255, 0.08)',
            })
          )}
          id="canvas"
        />
      </div>
    </div>
  );
};
