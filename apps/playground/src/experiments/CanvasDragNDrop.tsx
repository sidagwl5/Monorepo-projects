import { useEffect } from 'react';
import { tw, css } from 'twind/style';

export const CanvasDragNDrop = () => {
  useEffect(() => {
    const imageElement = document.getElementById('image') as HTMLImageElement;
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    let draggable = false;

    let lastX = 0;
    let lastY = 0;

    let initialX = 0;
    let initialY = 0;

    let finalX = 0;
    let finalY = 0;

    if (imageElement && canvasElement) {
      const disableDrag = (e: MouseEvent) => {
        if (draggable) {
          draggable = false;
          lastX = lastX + (finalX || e.offsetX) - initialX;
          lastY = lastY + (finalY || e.offsetY) - initialY;
          canvasElement.style.cursor = 'default';
          canvasElement.style.border = 'none';
        }
      };

      canvasElement.onmousedown = (e) => {
        const conditionY =
          lastY > 0
            ? e.offsetY > lastY
            : canvasElement.height - e.offsetY > Math.abs(lastY);

        const conditionX =
          lastX > 0
            ? e.offsetX > lastX
            : canvasElement.width - e.offsetX > Math.abs(lastX);

        if (conditionX && conditionY) {
          draggable = true;
          initialX = e.offsetX;
          initialY = e.offsetY;
          canvasElement.style.cursor = 'grabbing';
          canvasElement.style.border = '1px yellow solid';
        }
      };

      canvasElement.onmouseup = disableDrag;

      canvasElement.onmouseleave = (e) => {
        if (draggable) {
          draggable = false;

          lastX = lastX + (finalX || e.offsetX) - initialX;
          lastY = lastY + (finalY || e.offsetY) - initialY;
          canvasElement.style.cursor = 'default';
          canvasElement.style.border = 'none';
        }
      };

      canvasElement.onmousemove = (e) => {
        if (draggable) {
          finalX = e.offsetX;
          finalY = e.offsetY;

          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          context.drawImage(
            imageElement,
            lastX + e.offsetX - initialX,
            lastY + e.offsetY - initialY
          );
        }
      };
    }
  }, []);

  return (
    <>
      <img
        id="image"
        alt="dummy"
        className={tw('hidden')}
        onLoad={(e) => {
          const imageElement = document.getElementById(
            'image'
          ) as HTMLImageElement;
          const canvasElement = document.getElementById(
            'canvas'
          ) as HTMLCanvasElement;
          const context = canvasElement.getContext(
            '2d'
          ) as CanvasRenderingContext2D;

          canvasElement.width = e.currentTarget.naturalWidth;
          canvasElement.height = e.currentTarget.naturalHeight;

          context.drawImage(
            imageElement,
            0,
            0,
            imageElement.naturalWidth,
            imageElement.naturalHeight
          );
        }}
        src="https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"
      />
      <canvas
        className={tw('bg-[#1b1b1b]', css({ transition: '0.3s all ease-out' }))}
        id="canvas"
      />
    </>
  );
};
