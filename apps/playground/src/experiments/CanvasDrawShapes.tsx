import Crop32Icon from '@mui/icons-material/Crop32';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import DownloadIcon from '@mui/icons-material/Download';
import GestureIcon from '@mui/icons-material/Gesture';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Tooltip } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { css, tw } from 'twind/style';
import InterestsIcon from '@mui/icons-material/Interests';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

export const CanvasDrawShapes = () => {
  const snapshotRef = useRef<any>(null);
  const [drawingState, setDrawingState] = useState<any>({
    width: 1,
    color: 'white',
    eraser: false,
    paint: true,
    shape: 'rectangle',
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

    let dragging = false;
    let initialX = 0;
    let initialY = 0;

    canvasElement.onmousedown = (e) => {
      context.strokeStyle = 'white';
      context.lineWidth = drawingState.width;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      dragging = true;
      initialX = e.offsetX;
      initialY = e.offsetY;
      context.moveTo(initialX, initialY);
      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmousemove = (e) => {
      if (dragging) {
        if (!drawingState.eraser) {
          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          if (snapshotRef.current)
            context.putImageData(snapshotRef.current, 0, 0);
          if (drawingState.shape === 'rectangle') {
            context.strokeRect(
              initialX,
              initialY,
              e.offsetX - initialX,
              e.offsetY - initialY
            );
          } else if (drawingState.shape === 'square') {
            const finalX = e.offsetX - initialX;
            const finalY = e.offsetY - initialY;
            const length = finalX > finalY ? finalX : finalY;
            context.strokeRect(initialX, initialY, length, length);
          } else if (drawingState.shape === 'circle') {
            context.beginPath();
            const finalX = Math.abs(e.offsetX - initialX);
            const finalY = Math.abs(e.offsetY - initialY);
            const radius = finalX > finalY ? finalX : finalY;
            context.arc(initialX, initialY, radius, 0, 2 * Math.PI);
            context.stroke();
          } else if (drawingState.shape === 'triangle') {
            context.beginPath();

            const diffX = e.offsetX - initialX;
            const diffY = e.offsetY - initialY;

            context.moveTo(initialX, initialY);
            context.lineTo(initialX + diffX, initialY + diffY);
            context.moveTo(initialX, initialY);
            context.lineTo(initialX - diffX, initialY + diffY);
            context.lineTo(initialX + diffX, initialY + diffY);
            context.closePath();
            context.stroke();
          } else {
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
          }
        } else {
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
        }
      }
    };

    canvasElement.onmouseup = (e) => {
      dragging = false;
      snapshotRef.current = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      context.beginPath();
      canvasElement.style.border = 'none';
    };

    canvasElement.onmouseleave = (e) => {
      dragging = false;
      snapshotRef.current = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      context.beginPath();
      canvasElement.style.border = 'none';
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
    snapshotRef.current = null;
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
          <div className={tw('w-full flex flex-wrap gap-2 justify-between')}>
            {[
              {
                title: 'rectangle',
                icon: <Crop32Icon className={tw('text-[20px]!')} />,
              },
              {
                title: 'square',
                icon: <CropSquareIcon className={tw('text-[20px]!')} />,
              },
              {
                title: 'circle',
                icon: <PanoramaFishEyeIcon className={tw('text-[20px]!')} />,
              },
              {
                title: 'triangle',
                icon: <ChangeHistoryIcon className={tw('text-[20px]!')} />,
              },
              {
                title: 'random',
                icon: <InterestsIcon className={tw('text-[20px]!')} />,
              },
            ].map(({ title, icon }) => (
              <Tooltip arrow title={title} disableInteractive placement="top">
                <button
                  onClick={() => {
                    setDrawingState((prev: any) => ({
                      ...prev,
                      shape: title,
                    }));
                  }}
                  className={tw(
                    'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
                    css({ background: 'rgba(255, 255, 255, 0.12)' }),
                    drawingState.shape === title && 'bg-blue-600!'
                  )}
                >
                  {icon}
                </button>
              </Tooltip>
            ))}
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
