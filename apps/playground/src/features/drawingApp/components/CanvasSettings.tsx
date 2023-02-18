import { useEffect } from 'react';
import { tw } from 'twind/style';
import movePng from '../../../assets/move.png';
import { useDrawingContext } from '../Context';
import { Canvas } from '../classes/canvas.class';
import { ColorPalette } from './ColorPallete';
import { Doodle } from '../classes/doodle.class';

export const CanvasSettings = () => {
  const { canvasSettings, setCanvasSettings, coordinatesRef } =
    useDrawingContext();

  useEffect(() => {
    Canvas.getElements().canvas.style.cursor = `url(${movePng}), auto`;
  }, []);

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    canvas.style.backgroundColor = canvasSettings.bg_color;
  }, [canvasSettings.bg_color]);

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();

    let doodleSelected: Doodle | undefined;
    let move = false,
      moveDoodle = false,
      prevPageX = 0,
      prevPageY = 0;

    const onDrawingStop = (e) => {
      if (move) {
        move = false;
        prevPageX = 0;
        prevPageY = 0;
      }

      Canvas.storeImageData();
      moveDoodle = false;
    };

    canvas.onmousedown = (e) => {
      const _doodleSelected = coordinatesRef.find((line) =>
        line.isSelected(e.offsetX, e.offsetY)
      );

      if (_doodleSelected && doodleSelected?.id !== _doodleSelected.id) {
        doodleSelected?.eraseSelectionBox();
        doodleSelected = _doodleSelected;
      }

      if (doodleSelected) {
        const isCursorInside = doodleSelected.isCursorInside(
          e.offsetX,
          e.offsetY
        );

        if (!isCursorInside) {
          doodleSelected?.eraseSelectionBox();
          doodleSelected = undefined;
          move = true;
        } else {
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
          moveDoodle = true;
        }
      } else {
        move = true;
      }
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
      } else if (doodleSelected && moveDoodle) {
        Canvas.clearCanvas();
        coordinatesRef.forEach((v) => {
          if (v.id === doodleSelected.id) {
            doodleSelected.move(e.movementX, e.movementY);
            doodleSelected?.drawSelectionBox();
          } else {
            v.drawAgain();
          }
        });
      }
      // else {
      //   const doodleSelected = coordinatesRef.find((line) =>
      //     line.isSelected(e.offsetX, e.offsetY)
      //   );

      //   if (doodleSelected)
      //     Canvas.getElements().canvas.style.cursor = `pointer`;
      //   else Canvas.getElements().canvas.style.cursor = `url(${movePng}), auto`;
      // }
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
  }, []);

  return (
    <div className={tw('text-white flex flex-col gap-2')}>
      <p className={tw('font-medium text-sm capitalize')}>Bg Color</p>

      <ColorPalette
        customColor={canvasSettings.customColor}
        currentColor={canvasSettings.bg_color}
        updateColor={(bg_color: string, customColor: string) => {
          setCanvasSettings((prev: any) => ({
            ...prev,
            bg_color,
            customColor,
          }));
        }}
      />
    </div>
  );
};
