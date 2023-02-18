import DoneIcon from '@mui/icons-material/Done';
import { Switch, Tooltip } from '@mui/material';
import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import { useEffect } from 'react';
import { Canvas } from '../classes/canvas.class';
import { Doodle } from '../classes/doodle.class';
import { Line } from '../classes/line.class';
import penPng from '../../../assets/pen.png';
import { ColorPalette } from './ColorPallete';

const settingsOption = [
  {
    title: 'Straight Lines',
    key: 'line',
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
      drawable = true;

      canvas.style.border = '1px yellow solid';
      doodle = drawSettings.line
        ? new Line(e.offsetX, e.offsetY)
        : new Doodle(e.offsetX, e.offsetY);
      coordinatesRef.push(doodle);
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

        <ColorPalette
          customColor={drawSettings.customColor}
          currentColor={drawSettings.strokeStyle}
          updateColor={(strokeStyle: string, customColor: string) => {
            setDrawSettings((prev: any) => ({
              ...prev,
              strokeStyle,
              customColor,
            }));
          }}
        />
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
