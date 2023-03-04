import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import { useEffect } from 'react';
import { Canvas } from '../../../classes/canvas.class';
import eraserPng from '../../../assets/eraser.png';
import { Doodle } from '../../../classes/doodle.class';
import { Slider } from 'ui-lib';

export const EraserSettings = () => {
  const {
    handleEraserSettings: [eraserSettings, setEraserSettings],
    coordinatesRef,
  } = useDrawingContext();

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
        drawable = false;
        context.beginPath();
      }
    };

    canvas.onmousedown = (e) => {
      drawable = true;
      Canvas.storeImageData();

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
    <div className={tw('w-full flex-col flex gap-4')}>
      <div className={tw('flex flex-col gap-1')}>
        <h3 className={tw('text-[#ECDEDE]')}>Thickness</h3>
        <Slider
          value={eraserSettings.lineWidth}
          onChange={(e) =>
            setEraserSettings((prev: any) => ({
              ...prev,
              lineWidth: e.target.value,
            }))
          }
          min={1}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};
