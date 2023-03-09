import { Popper } from '@mui/material';
import { useEffect } from 'react';
import { tw } from 'twind/style';
import { Slider } from 'ui-lib';
import { Canvas } from '../../../classes/canvas.class';
import { Doodle } from '../../../classes/doodle.class';
import { useDrawingContext } from '../Context';

export const EraserSettings = ({ anchorEl }) => {
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
    <Popper
      placement="left-start"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      className={tw(
        '!ml-4 p-3 rounded-lg overflow-hidden bg-[#574D51] border border-[#695F63]'
      )}
    >
      <div
        className={tw(
          'flex-col flex gap-4 w-48 text-sm font-semibold font-nunitoSans'
        )}
      >
        <div className={tw('flex flex-col gap-1')}>
          <h3 className={tw('text-[#ECDEDE]')}>Thickness</h3>
          <Slider
            value={eraserSettings.lineWidth}
            onChange={(_, value) =>
              setEraserSettings((prev: any) => ({
                ...prev,
                lineWidth: value,
              }))
            }
            min={1}
            max={100}
            step={1}
          />
        </div>
      </div>
    </Popper>
  );
};
