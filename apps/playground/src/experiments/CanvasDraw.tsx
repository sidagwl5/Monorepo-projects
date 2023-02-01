import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import GestureIcon from '@mui/icons-material/Gesture';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { css, tw } from 'twind/style';

export const CanvasDraw = () => {
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

    const scale = 4;

    canvasElement.style.width = `${window.innerWidth / 2.5}px`;
    canvasElement.style.height = `${((window.innerWidth / 2.5) * 3) / 4}px`;

    canvasElement.width = (window.innerWidth / 2.5) * scale;
    canvasElement.height = (((window.innerWidth / 2.5) * 3) / 4) * scale;

    context.scale(scale, scale);

    // window.addEventListener('resize', (e) => {
    //   const backupCanvas = document.createElement('canvas');
    //   const backupCanvasContext = backupCanvas.getContext(
    //     '2d'
    //   ) as CanvasRenderingContext2D;

    //   backupCanvas.width = canvasElement.width;
    //   backupCanvas.height = canvasElement.height;

    //   backupCanvasContext.drawImage(canvasElement, 0, 0);

    //   canvasElement.width = window.innerWidth / 2.5;
    //   canvasElement.height = (canvasElement.width * 3) / 4;

    //   context.drawImage(backupCanvas, 0, 0);
    // });
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;
    canvasElement.onmousedown = (e) => {
      context.strokeStyle = drawingState.color;
      context.lineWidth = drawingState.width;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      drawable = true;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmouseleave = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    };

    canvasElement.ontouchstart = (e) => {
      e.preventDefault();

      const mouseDown = new MouseEvent('mousedown', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvasElement.dispatchEvent(mouseDown);
    };

    canvasElement.ontouchend = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvasElement.dispatchEvent(mouseEnd);
    };

    canvasElement.ontouchcancel = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvasElement.dispatchEvent(mouseEnd);
    };

    canvasElement.ontouchmove = (e) => {
      const mouseDown = new MouseEvent('mousemove', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvasElement.dispatchEvent(mouseDown);
    };
  }, [drawingState]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    if (drawingState.eraser)
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
        <div className={tw('w-full flex gap-2')}>
          <button
            onClick={() => {
              setDrawingState((prev: any) => ({
                ...prev,
                paint: true,
                eraser: false,
              }));
            }}
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
              css({ background: 'rgba(255, 255, 255, 0.12)' }),
              drawingState.paint && 'bg-blue-600!'
            )}
          >
            <GestureIcon className={tw('text-[20px]!')} />
          </button>
          <button
            onClick={() => {
              setDrawingState((prev: any) => ({
                ...prev,
                eraser: true,
                paint: false,
              }));
            }}
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
              css({ background: 'rgba(255, 255, 255, 0.12)' }),
              drawingState.eraser && 'bg-blue-600!'
            )}
          >
            <ModeEditIcon className={tw('text-[20px]!')} />
          </button>
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
        </div>

        <div className={tw('text-white flex flex-col gap-1')}>
          <p className={tw('font-medium text-sm capitalize')}>width</p>
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
