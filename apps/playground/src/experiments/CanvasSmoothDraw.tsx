import { useEffect } from 'react';
import { css, tw } from 'twind/style';

export const CanvasSmoothDraw = () => {
  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;

    window.addEventListener('resize', (e) => {
      const backupCanvas = document.createElement('canvas');
      const backupCanvasContext = backupCanvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      backupCanvas.width = canvasElement.width;
      backupCanvas.height = canvasElement.height;

      backupCanvasContext.drawImage(canvasElement, 0, 0);

      canvasElement.width = window.innerWidth / 2.5;
      canvasElement.height = (canvasElement.width * 3) / 4;

      context.drawImage(backupCanvas, 0, 0);
    });
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;
    let coordinates: any[] = [];
    let snapshot: ImageData | undefined;

    const onDrawingStop = (e) => {
      if (drawable) {
        context.beginPath();
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if (snapshot) context.putImageData(snapshot, 0, 0);

        if (coordinates.length > 1) {
          context.moveTo(coordinates[0].x, coordinates[0].y);

          let i;
          for (i = 1; i < coordinates.length - 2; i++) {
            const xc = (coordinates[i].x + coordinates[i + 1].x) / 2;
            const yc = (coordinates[i].y + coordinates[i + 1].y) / 2;
            context.quadraticCurveTo(
              coordinates[i].x,
              coordinates[i].y,
              xc,
              yc
            );
          }
          // curve through the last two coordinates
          context.quadraticCurveTo(
            coordinates[i].x,
            coordinates[i].y,
            coordinates[i + 1].x,
            coordinates[i + 1].y
          );

          context.stroke();
        }

        snapshot = null;
        canvasElement.style.border = 'none';
        drawable = false;
        coordinates = [];
        context.beginPath();
      }
    };

    canvasElement.onmousedown = (e) => {
      context.strokeStyle = 'white';
      context.lineWidth = 2;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      snapshot = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawable = true;
      context.moveTo(e.offsetX, e.offsetY);
      coordinates.push({ x: e.offsetX, y: e.offsetY });

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = onDrawingStop;

    canvasElement.onmouseleave = onDrawingStop;

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        coordinates.push({ x: e.offsetX, y: e.offsetY });
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
