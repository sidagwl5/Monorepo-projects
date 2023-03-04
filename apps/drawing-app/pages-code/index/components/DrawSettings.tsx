import { Canvas } from 'apps/drawing-app/classes/canvas.class';
import { Doodle } from 'apps/drawing-app/classes/doodle.class';
import { Line } from 'apps/drawing-app/classes/line.class';
import { useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { css, tw } from 'twind/style';
import { Slider } from 'ui-lib';
import { useDrawingContext } from '../Context';

export const DrawSettings = () => {
  const {
    handleDrawSettings: [drawSettings, setDrawSettings],
    coordinatesRef,
  } = useDrawingContext();

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

    const onDrawingStop = (e) => {
      if (drawable) {
        if (doodle.getPoints().length > 1 && drawSettings.smooth_line) {
          doodle.addSmoothness();
        }

        Canvas.storeImageData();
        drawable = false;
        context.beginPath();
      }
    };

    canvas.onmousedown = (e) => {
      drawable = true;
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
    <div className={tw('w-full flex-col flex gap-4')}>
      <div className={tw('flex flex-col gap-1')}>
        <h3 className={tw('text-[#ECDEDE]')}>Thickness</h3>
        <Slider
          onChange={(_, value) =>
            setDrawSettings((prev) => ({ ...prev, lineWidth: value }))
          }
          value={drawSettings.lineWidth}
          min={1}
          max={100}
          step={1}
        />
      </div>

      <div className={tw('flex flex-col gap-1')}>
        <h3 className={tw('text-[#ECDEDE]')}>Pallete</h3>
        <SketchPicker
          presetColors={[
            'white',
            '#1b1b1b',
            '#34d399',
            '#60a5fa',
            '#f87171',
            '#fbbf24',
          ]}
          disableAlpha
          onChange={(e) =>
            setDrawSettings((prev) => ({
              ...prev,
              strokeStyle: e.hex,
            }))
          }
          color={drawSettings.strokeStyle}
          className={tw(
            css({
              '&': {
                padding: '0px !important',
                background: 'transparent !important',
                boxShadow: 'unset !important',
                display: 'flex',
                flexDirection: 'column',
                width: 'unset !important',
                gap: '12px',
                '& .saturation-white div:nth-child(2)': {
                  pointerEvents: 'none !important',
                },
                '& > div:nth-child(1)': {
                  height: '130px',
                  borderRadius: '4px',
                  overflow: 'hidden !important',
                  paddingBottom: '0px !important',
                },
                '& .flexbox-fix div': {
                  height: 'auto',
                },
                '& .flexbox-fix:nth-child(3)': {
                  marginTop: '-4px',
                  padding: '0px !important',
                  color: 'white',
                },
                '& .flexbox-fix:nth-child(3) input': {
                  background: 'transparent !important',
                  overflow: 'hidden',
                  width: '100% !important',
                  boxShadow: 'unset !important',
                  border: '1px solid rgb(204 204 204) !important',
                },
                '& .flexbox-fix:nth-child(3) > div': {
                  padding: '0px !important',
                },
                '& .flexbox-fix:nth-child(3) > div:nth-child(2) > div > input':
                  {
                    borderRadius: '4px 0px 0px 4px !important',
                    overflow: 'hidden',
                    width: '100% !important',
                  },
                '& .flexbox-fix:nth-child(3) > div:nth-child(3) > div > input':
                  {
                    border: 'none !important',
                    borderTop: '1px solid rgb(204 204 204) !important',
                    borderBottom: '1px solid rgb(204 204 204) !important',
                    borderRight: '1px solid rgb(204 204 204) !important',
                  },
                '& .flexbox-fix:nth-child(3) > div:nth-child(4) > div > input':
                  {
                    border: 'none !important',
                    borderTop: '1px solid rgb(204 204 204) !important',
                    borderBottom: '1px solid rgb(204 204 204) !important',
                    borderRight: '1px solid rgb(204 204 204) !important',
                    borderRadius: '0px 4px 4px 0px !important',
                  },
                '& .flexbox-fix:nth-child(3) > div:nth-child(5) > div > input':
                  {
                    borderRadius: '0px 4px 4px 0px !important',
                    overflow: 'hidden',
                    width: '100% !important',
                  },
                '& .flexbox-fix:nth-child(3) label': {
                  padding: '0px !important',
                  color: 'white !important',
                  fontSize: '9px !important',
                  textTransform: 'uppercase !important',
                },
                '& .flexbox-fix:nth-child(3) > div div': {
                  paddingLeft: '0px !important',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  alignItems: 'flex-start',
                },
                '& .flexbox-fix:nth-child(3) > div:nth-child(1)': {
                  input: {
                    borderRadius: '4px !important',
                  },
                  marginRight: '8px',
                },
                '& .flexbox-fix:nth-child(2)': {
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: '8px',
                },
                '& .flexbox-fix:nth-child(2) div': {
                  padding: '0px !important',
                  margin: '0px !important',
                },
                '& .flexbox-fix:nth-child(2) > div:nth-child(2)': {
                  width: '30px !important',
                  height: '30px !important',
                },
                '& .flexbox-fix:nth-child(2) > div:nth-child(1)': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                },
                '& .flexbox-fix:nth-child(2) > div:nth-child(1) > div': {
                  borderRadius: '500px !important',
                  overflow: 'hidden',
                },
                '& .flexbox-fix:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(3) > div > div':
                  {
                    height: '10px !important',
                    width: '10px !important',
                    borderRadius: '500px !important',
                  },
                '& .hue-horizontal > div > div': {
                  height: '10px !important',
                  width: '10px !important',
                  borderRadius: '500px !important',
                },
                '& .flexbox-fix:nth-child(4)': {
                  padding: '0px !important',
                  margin: '0px !important',
                  gap: '8px',
                  border: 'unset !important',
                  marginTop: '4px !important',
                },
                '& .flexbox-fix:nth-child(4) > div': {
                  padding: '0px !important',
                  margin: '0px !important',
                  width: '20px !important',
                  height: '20px !important',
                },
              },
            })
          )}
        />
      </div>
    </div>
  );
};
