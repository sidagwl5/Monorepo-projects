import DoneIcon from '@mui/icons-material/Done';
import { Switch, Tooltip } from '@mui/material';
import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import { useEffect } from 'react';
import { Canvas } from '../classes/canvas.class';
import { Doodle } from '../classes/doodle.class';
import { Line } from '../classes/line.class';
import penPng from '../../../assets/pen.png';

const settingsOption = [
  {
    title: 'Straight Lines',
    key: 'line',
  },
  {
    title: 'Delete doodles',
    key: 'delete',
  },
  {
    title: 'Smooth Draw',
    key: 'smooth_line',
  },
  {
    title: 'Line-Join (Round)',
    key: 'lineJoin',
  },
  {
    title: 'Line-Cap (Round)',
    key: 'lineCap',
  },
];

export const DrawSettings = () => {
  const { drawSettings, setDrawSettings, coordinatesRef } = useDrawingContext();

  useEffect(() => {
    Canvas.getElements().canvas.style.cursor = `url(${penPng}), auto`;

    return () => Canvas.putImageData();
  }, []);

  useEffect(() => {
    if (!drawSettings.delete) Canvas.putImageData();
  }, [drawSettings.delete]);

  useEffect(() => {
    Canvas.updateContextConfig({
      ...drawSettings,
      globalCompositeOperation: 'source-over',
    });
  }, [drawSettings]);

  useEffect(() => {
    const { context, canvas } = Canvas.getElements();

    let drawable = false;
    let doodle: Doodle | Line;
    let doodleSelected: Doodle | undefined;

    const onDrawingStop = (e) => {
      if (drawable) {
        if (doodle.getPoints().length > 1 && drawSettings.smooth_line) {
          doodle.addSmoothness();
        }

        Canvas.storeImageData();
        canvas.style.border = 'none';
        drawable = false;
        context.beginPath();
      }
    };

    canvas.onmousedown = (e) => {
      if (drawSettings.delete) {
        console.log(coordinatesRef);

        doodleSelected = coordinatesRef.find((line) =>
          line.isSelected(e.offsetX, e.offsetY)
        );

        console.log(doodleSelected);

        if (doodleSelected) {
          Canvas.putImageData();
          context.save();
          context.strokeStyle = 'yellow';
          context.lineWidth = 2;

          const { x_max, x_min, y_max, y_min } =
            doodleSelected.calculateBoxDimensions();
          context.strokeRect(
            x_min - 2,
            y_min - 2,
            x_max - x_min + 4,
            y_max - y_min + 4
          );

          context.restore();
        }
      } else {
        drawable = true;

        canvas.style.border = '1px yellow solid';
        doodle = drawSettings.line
          ? new Line(e.offsetX, e.offsetY)
          : new Doodle(e.offsetX, e.offsetY);
        coordinatesRef.push(doodle);
      }
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (drawable) {
        doodle.addPoints(e.offsetX, e.offsetY);
        context.stroke();
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
        clientX: touch.clientX,
        clientY: touch.clientY,
      });

      canvas.dispatchEvent(mouseDown);
    };

    window.onkeydown = (e) => {
      if (e.code === 'Delete') {
        if (doodleSelected) {
          Canvas.clearCanvas();
          const getIndex = coordinatesRef.findIndex(
            (v) => v.id === doodleSelected?.id
          );

          coordinatesRef.splice(getIndex, 1);

          coordinatesRef.forEach((v) => {
            v.drawAgain();
          });

          Canvas.storeImageData();
        }
      }
    };
  }, [
    drawSettings.smooth_line,
    drawSettings.line,
    drawSettings,
    coordinatesRef,
  ]);

  return (
    <>
      <div className={tw('text-white flex flex-col gap-2')}>
        <p className={tw('font-medium text-sm capitalize')}>stroke width</p>
        <input
          className={tw(
            'px-2 py-1 rounded-md',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
          value={drawSettings.lineWidth as string}
          onChange={(e) =>
            setDrawSettings((prev) => ({
              ...prev,
              lineWidth: e.target.value,
            }))
          }
          type="text"
        />
      </div>

      <div className={tw('text-white flex flex-col gap-1')}>
        <p className={tw('font-medium text-sm capitalize')}>Colors</p>
        <div className={tw('w-full flex gap-2')}>
          {['green', 'blue', 'red', 'pink', 'yellow'].map((strokeStyle) => (
            <Tooltip
              arrow
              title={strokeStyle}
              disableInteractive
              placement="top"
            >
              <div className={tw('relative cursor-pointer')}>
                {strokeStyle === drawSettings.strokeStyle && (
                  <div
                    onClick={() => {
                      setDrawSettings((prev: any) => ({
                        ...prev,
                        strokeStyle,
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
                    setDrawSettings((prev: any) => ({
                      ...prev,
                      strokeStyle,
                    }));
                  }}
                  className={tw(
                    'w-6 h-6 rounded-full',
                    `bg-${strokeStyle}-400`
                  )}
                />
              </div>
            </Tooltip>
          ))}

          <Tooltip arrow title={'white'} disableInteractive placement="top">
            <div className={tw('relative cursor-pointer')}>
              {'white' === drawSettings.strokeStyle && (
                <div
                  onClick={() => {
                    setDrawSettings((prev: any) => ({
                      ...prev,
                      strokeStyle: 'white',
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
                  setDrawSettings((prev: any) => ({
                    ...prev,
                    strokeStyle: 'white',
                  }));
                }}
                className={tw('w-6 h-6 rounded-full', `bg-white`)}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className={tw('flex flex-col gap-2')}>
        {settingsOption.map(({ key, title }) => (
          <div className={tw('flex justify-between items-center')}>
            <p className={tw('font-medium text-white text-sm capitalize')}>
              {title}
            </p>
            <Switch
              onChange={(_, checked) => {
                setDrawSettings((prev: any) => ({
                  ...prev,
                  [key]: checked,
                }));
              }}
              classes={{ track: tw('bg-yellow-400!') }}
              checked={drawSettings[key]}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DrawSettings;
