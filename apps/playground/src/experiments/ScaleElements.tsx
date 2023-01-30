import { useEffect } from 'react';
import { css, tw } from 'twind/style';

export const ScaleElements = () => {
  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.style.width = String(window.innerWidth / 2.5);
    canvasElement.style.height = String((canvasElement.width * 3) / 4);

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);

    context.fillStyle = 'blue';
    context.fillRect(50, 50, 100, 50);

    const getImageData = context.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    const imageElement = new Image();
    const link = canvasElement.toDataURL('image/png');

    imageElement.src = link;

    window.addEventListener('resize', (e) => {
      canvasElement.width = window.innerWidth / 2.5;
      canvasElement.height = (canvasElement.width * 3) / 4;

      context.drawImage(
        imageElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
    });
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;
    const imageElement = new Image();
    imageElement.src = 'https://art.pixilart.com/2b15c083d08ecb9.png';
    canvasElement.onmousedown = (e) => {
      context.strokeStyle = 'black';
      context.lineWidth = 4;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      drawable = true;
      context.lineTo(e.offsetX, e.offsetY);
      context.drawImage(imageElement, e.offsetX, e.offsetY, 50, 50);
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
        // context.lineTo(e.offsetX, e.offsetY);
        // context.stroke();
        context.drawImage(imageElement, e.offsetX, e.offsetY, 50, 50);
      }
    };
  }, []);

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
