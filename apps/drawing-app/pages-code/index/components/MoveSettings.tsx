import { useEffect } from 'react';
import { Canvas } from '../../../classes/canvas.class';

export const MoveSettings = () => {
  useEffect(() => {
    const { canvas } = Canvas.getElements();

    let move = false,
      prevPageX = 0,
      prevPageY = 0;

    const onDrawingStop = (e) => {
      move = false;
      prevPageX = 0;
      prevPageY = 0;
    };

    canvas.onmousedown = (e) => {
      move = true;
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (move) {
        const [x = 0, y = 0] = canvas.style.translate
          ? canvas.style.translate
              .split(' ')
              .map((coordinate) => parseInt(coordinate))
          : [];

        canvas.style.translate = `${x + e.movementX}px ${y + e.movementY}px`;
      }
    };

    canvas.ontouchstart = (e) => {
      e.preventDefault();

      const mouseDown = new MouseEvent('mousedown');
      canvas.dispatchEvent(mouseDown);
    };

    canvas.ontouchend = (e) => {
      const mouseUp = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseUp);
    };

    canvas.ontouchcancel = (e) => {
      const mouseCancel = new MouseEvent('mousecancel');
      canvas.dispatchEvent(mouseCancel);
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

    return () => {
      canvas.onmousedown = null;
      canvas.onmousemove = null;
      canvas.onmouseleave = null;
      canvas.onmouseup = null;
      canvas.ontouchend = null;
      canvas.ontouchcancel = null;
      canvas.ontouchmove = null;
      canvas.ontouchstart = null;
    };
  }, []);

  return null;
};
