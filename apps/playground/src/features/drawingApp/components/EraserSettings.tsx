import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import { useEffect } from 'react';
import { Canvas } from '../classes/canvas.class';
import eraserPng from '../../../assets/eraser.png';
import { Doodle } from '../classes/doodle.class';

export const EraserSettings = () => {
  const { eraserSettings, setEraserSettings, coordinatesRef } =
    useDrawingContext();

  useEffect(() => {
    Canvas.getElements().canvas.style.cursor = `url(${eraserPng}), auto`;
  }, []);

  useEffect(() => {
    Canvas.updateContextConfig({
      ...eraserSettings,
      globalCompositeOperation: 'destination-out',
      lineCap: true,
      lineJoin: true,
    });
  }, [eraserSettings]);

  useEffect(() => {
    const { context, canvas } = Canvas.getElements();

    let drawable = false;
    let doodle: Doodle;

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
      doodle = new Doodle(e.offsetX, e.offsetY);
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
  }, [coordinatesRef]);

  return (
    <div className={tw('text-white flex flex-col gap-2')}>
      <p className={tw('font-medium text-sm capitalize')}>Eraser width</p>
      <input
        className={tw(
          'px-2 py-1 rounded-md',
          css({ background: 'rgba(255, 255, 255, 0.12)' })
        )}
        value={eraserSettings.lineWidth}
        onChange={(e) =>
          setEraserSettings((prev: any) => ({
            ...prev,
            lineWidth: e.target.value,
          }))
        }
        type="text"
      />
    </div>
  );
};
