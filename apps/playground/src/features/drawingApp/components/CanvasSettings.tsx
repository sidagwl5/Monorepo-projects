import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { css, tw } from 'twind/style';
import movePng from '../../../assets/move.png';
import { useDrawingContext } from '../Context';
import { Canvas } from '../classes/canvas.class';

export const CanvasSettings = () => {
  const { canvasSettings, setCanvasSettings } = useDrawingContext();

  useEffect(() => {
    Canvas.getElements().canvas.style.cursor = `url(${movePng}), auto`;
  }, []);

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    canvas.style.backgroundColor = canvasSettings.bg_color;
  }, [canvasSettings.bg_color]);

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    let move = false,
      prevPageX = 0,
      prevPageY = 0;

    const onDrawingStop = (e) => {
      if (move) {
        move = false;
        prevPageX = 0;
        prevPageY = 0;
      }
    };

    canvas.onmousedown = (e) => {
      move = true;
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (move) {
        canvas.style.left = `${
          parseInt(canvas.style.left || window.getComputedStyle(canvas).left) +
          e.movementX
        }px`;

        canvas.style.top = `${
          parseInt(canvas.style.top || window.getComputedStyle(canvas).top) +
          e.movementY
        }px`;
      }
    };

    canvas.ontouchstart = (e) => {
      e.preventDefault();

      const mouseDown = new MouseEvent('mousedown', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvas.dispatchEvent(mouseDown);
    };

    canvas.ontouchend = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseEnd);
    };

    canvas.ontouchcancel = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseEnd);
    };

    canvas.ontouchmove = (e) => {
      const touch = e.touches[0];

      const mouseDown = new MouseEvent('mousemove', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        movementX: touch.pageX - (prevPageX || touch.pageX),
        movementY: touch.pageY - (prevPageY || touch.pageY),
      });

      prevPageX = touch.pageX;
      prevPageY = touch.pageY;
      canvas.dispatchEvent(mouseDown);
    };
  }, []);

  return (
    <div className={tw('text-white flex flex-col gap-2')}>
      <p className={tw('font-medium text-sm capitalize')}>Bg Color</p>
      <div className={tw('w-full flex gap-2')}>
        {[
          { title: 'green', value: 'green' },
          { title: 'blue', value: 'blue' },
          { title: 'red', value: 'red' },
          { title: 'pink', value: 'pink' },
          { title: 'yellow', value: 'yellow' },
          { title: 'hazelnut', value: '#313142' },
        ].map(({ title, value }) => (
          <Tooltip arrow title={title} disableInteractive placement="top">
            <div className={tw('relative cursor-pointer')}>
              {value === canvasSettings.bg_color && (
                <div
                  onClick={() => {
                    setCanvasSettings((prev: any) => ({
                      ...prev,
                      bg_color: value,
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
                  setCanvasSettings((prev: any) => ({
                    ...prev,
                    bg_color: value,
                  }));
                }}
                className={tw(
                  'w-6 h-6 rounded-full',
                  title === 'hazelnut'
                    ? css({ background: value })
                    : `bg-${value}-400`
                )}
              />
            </div>
          </Tooltip>
        ))}

        <Tooltip arrow title={'white'} disableInteractive placement="top">
          <div className={tw('relative cursor-pointer')}>
            {'white' === canvasSettings.bg_color && (
              <div
                onClick={() => {
                  setCanvasSettings((prev: any) => ({
                    ...prev,
                    bg_color: 'white',
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
                setCanvasSettings((prev: any) => ({
                  ...prev,
                  bg_color: 'white',
                }));
              }}
              className={tw('w-6 h-6 rounded-full', `bg-white`)}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
