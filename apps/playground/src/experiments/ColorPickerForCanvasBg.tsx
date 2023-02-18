import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import { Popover, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { css, tw } from 'twind/style';

const ColorPalette = ({ currentColor, updateColor }: any) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [customColor, setCustomColor] = useState('#313142');
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={tw('w-full flex gap-2')}>
      {['green', 'blue', 'red', 'pink', 'yellow', customColor].map(
        (color, index) => (
          <Tooltip
            arrow
            title={color}
            disableInteractive
            disableFocusListener
            placement="top"
          >
            <div
              ref={color === customColor ? anchorRef : undefined}
              onClick={
                color === customColor && currentColor === customColor
                  ? setPopoverOpen.bind(this, true)
                  : undefined
              }
              className={tw('relative cursor-pointer')}
            >
              {color === currentColor && (
                <div
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
                  updateColor(color);
                }}
                className={tw(
                  'w-6 h-6 rounded-full',
                  color === customColor ? `bg-[${color}]` : `bg-${color}-400`
                )}
              />
            </div>
          </Tooltip>
        )
      )}

      <Popover
        open={popoverOpen}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'center',
        }}
        onClose={(e) => {
          console.log('close');
          setPopoverOpen(false);
        }}
        anchorEl={anchorRef.current}
      >
        <SketchPicker
          color={customColor}
          styles={{
            default: {
              Saturation: {
                padding: '40px !important',
                pointerEvents: 'none',
              },
            },
          }}
          onChange={(e) => {
            updateColor(e.hex);
            setCustomColor(e.hex);
          }}
        />
      </Popover>
    </div>
  );
};

export const ColorPickerForCanvasBg = () => {
  const [drawingState, setDrawingState] = useState<any>({
    color: 'white',
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
  }, []);

  useEffect(() => {
    console.log(drawingState);

    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.style.background = drawingState.color;
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
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
              css({ background: 'rgba(255, 255, 255, 0.12)' })
            )}
          >
            <DashboardIcon className={tw('text-[20px]!')} />
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

        <ColorPalette
          currentColor={drawingState.color}
          updateColor={(color: string) =>
            setDrawingState((prev) => ({
              ...prev,
              color,
            }))
          }
        />

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
