import { useEffect, useRef, useState } from 'react';
import { tw, css } from 'twind/style';

export const DrawLinesAndImplementShortcuts = () => {
  const [draw, setDraw] = useState(true);
  const coordinatesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.style.width = String(window.innerWidth / 2.5);
    canvasElement.style.height = String((canvasElement.width * 3) / 4);

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;

    let imageData: ImageData;
    let shortcut: string;
    let points: any[] = [];

    canvasElement.onmousedown = (e) => {
      context.strokeStyle = 'white';
      context.lineWidth = 4;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      drawable = true;

      context.moveTo(e.offsetX, e.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      points.push({ x: e.offsetX, y: e.offsetY });
      context.stroke();

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = (e) => {
      context.beginPath();
      imageData = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawable = false;
      points = [];
      canvasElement.style.border = 'none';
    };

    canvasElement.onmouseleave = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        context.beginPath();
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if (imageData) context.putImageData(imageData, 0, 0);
        context.moveTo(points[0].x, points[0].y);

        if (shortcut === 'y') context.lineTo(points[0].x, e.offsetY);
        else if (shortcut === 'x') context.lineTo(e.offsetX, points[0].y);
        else context.lineTo(e.offsetX, e.offsetY);

        if (points[1]) {
          points[1].x = e.offsetX;
          points[1].y = e.offsetY;
        } else {
          points[1] = { x: e.offsetX, y: e.offsetY };
        }

        context.stroke();
      }
    };

    window.onkeydown = (e) => {
      if (e.key === 'esc') shortcut = '';
      else shortcut = e.key;

      context.beginPath();
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
      if (imageData) context.putImageData(imageData, 0, 0);
      context.moveTo(points[0].x, points[0].y);

      if (shortcut === 'y') context.lineTo(points[0].x, points[1].y);
      else if (shortcut === 'x') context.lineTo(points[1].x, points[0].y);
      else context.lineTo(points[1].x, points[1].y);
      context.stroke();
    };
  }, [draw]);

  return (
    <div
      className={tw(
        'h-full flex-1 flex justify-center items-center',
        css({ background: '#1b1b1b' })
      )}
    >
      <canvas
        className={tw(
          css({
            transition: '0.3s all ease-out',
            background: 'rgba(255, 255, 255, 0.08)',
          })
        )}
        id="canvas"
      />
    </div>
  );
};
