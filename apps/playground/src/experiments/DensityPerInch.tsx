import { useEffect } from 'react';
import { css, tw } from 'twind/style';

export const DensityPerInch = () => {
  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    const scale = 6;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.style.width = `${window.innerWidth / 2.5}px`;
    canvasElement.style.height = `${((window.innerWidth / 2.5) * 3) / 4}px`;

    canvasElement.style.overflow = 'hidden';
    canvasElement.width = (window.innerWidth / 2.5) * scale;
    canvasElement.height = (((window.innerWidth / 2.5) * 3) / 4) * scale;

    context.scale(scale, scale);
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;
    canvasElement.onmousedown = (e) => {
      context.strokeStyle = 'white';
      context.lineWidth = 4;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      drawable = true;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmouseleave = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    };
  }, []);

  return (
    <div
      className={tw(
        'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
      )}
    >
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
    </div>
  );
};
