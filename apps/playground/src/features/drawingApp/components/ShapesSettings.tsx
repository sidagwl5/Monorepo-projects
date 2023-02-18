import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from '@mui/material';
import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import { Canvas } from '../classes/canvas.class';
import { Rectangle } from '../classes/rectangle.class';
import { useEffect, useState } from 'react';
import shapesPng from '../../../assets/shapes.png';
import { Square } from '../classes/square.class';
import { Circle } from '../classes/circle.class';
import { ColorPalette } from './ColorPallete';

const types = [
  {
    title: 'Rectangle',
    class: Rectangle,
  },
  {
    title: 'Square',
    class: Square,
  },
  {
    title: 'Circle',
    class: Circle,
  },
];

export const ShapesSettings = () => {
  const [currentShape, setCurrentShape] = useState(types[0]);
  const { shapesSettings, setShapesSettings, coordinatesRef } =
    useDrawingContext();

  useEffect(() => {
    Canvas.updateContextConfig({
      ...shapesSettings,
      globalCompositeOperation: 'source-over',
      lineCap: true,
      lineJoin: true,
    });
  }, [shapesSettings]);

  useEffect(() => {
    Canvas.getElements().canvas.style.cursor = `url(${shapesPng}), auto`;
  }, []);

  useEffect(() => {
    const { context, canvas } = Canvas.getElements();

    let drawable = false;
    let doodle: Rectangle | Square | Circle;

    const onDrawingStop = (e) => {
      if (drawable) {
        Canvas.storeImageData();
        canvas.style.border = 'none';
        drawable = false;
        context.beginPath();
      }
    };

    canvas.onmousedown = (e) => {
      drawable = true;
      Canvas.storeImageData();

      canvas.style.border = '1px yellow solid';
      doodle = new currentShape.class(e.offsetX, e.offsetY);
      coordinatesRef.push(doodle);
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (drawable) {
        doodle.addFinalPoints(e.offsetX, e.offsetY);
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
  }, [coordinatesRef, currentShape]);

  return (
    <>
      <div className={tw('text-white flex flex-col gap-2')}>
        <p className={tw('font-medium text-sm capitalize')}>shape width</p>
        <input
          className={tw(
            'px-2 py-1 rounded-md',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
          value={shapesSettings.lineWidth as string}
          onChange={(e) =>
            setShapesSettings((prev) => ({
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
          customColor={shapesSettings.customColor}
          currentColor={shapesSettings.strokeStyle}
          updateColor={(strokeStyle: string, customColor: string) => {
            setShapesSettings((prev: any) => ({
              ...prev,
              strokeStyle,
              customColor,
            }));
          }}
        />
      </div>

      <div className={tw('text-white flex flex-col gap-1')}>
        <p className={tw('font-medium text-sm capitalize')}>Shapes</p>
        <div className={tw('w-full flex gap-2')}>
          {types.map((type) => (
            <Tooltip
              arrow
              title={type.title}
              disableInteractive
              placement="top"
            >
              <div
                onClick={setCurrentShape.bind(this, type)}
                className={tw(
                  'relative cursor-pointer text-[13px] px-2 py-1 border',
                  currentShape.title === type.title && 'bg-blue-500'
                )}
              >
                {type.title}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
};
