import { tw, css } from 'twind/style';
import { useEffect, useRef } from 'react';
import { CanvasHandler } from '../classes/CanvasHandler.class';

export const Content = ({ data }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      const _canvasElement = canvasRef.current as HTMLCanvasElement;
      const _imageElement = imageRef.current as HTMLImageElement;

      CanvasHandler.initialize(_canvasElement, _imageElement);
      clearInterval(interval);
    }, 1000);
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current as HTMLCanvasElement;

    let draggable = false;
    let initialX = 0;
    let initialY = 0;

    let prevX = CanvasHandler.getCoordinates().dx;
    let prevY = CanvasHandler.getCoordinates().dy;

    canvasElement.onmousedown = (e) => {
      initialX = e.offsetX;
      initialY = e.offsetY;
      draggable = true;
      CanvasHandler.canvas.style.cursor = 'grabbing';
      CanvasHandler.canvas.style.border = '2px solid yellow';
    };

    canvasElement.onmouseup = (e) => {
      if (draggable) {
        CanvasHandler.setCoordinates(
          CanvasHandler.getCoordinates().dx + (e.offsetX - initialX),
          CanvasHandler.getCoordinates().dy + (e.offsetY - initialY)
        );
        draggable = false;
        CanvasHandler.canvas.style.cursor = 'default';
        CanvasHandler.canvas.style.border = 'none';
      }
    };

    canvasElement.onmousemove = (e) => {
      if (draggable) {
        CanvasHandler.context.clearRect(
          prevX,
          prevY,
          CanvasHandler.image.width as number,
          CanvasHandler.image.height
        );

        CanvasHandler.context.drawImage(
          CanvasHandler.image,
          CanvasHandler.getCoordinates().dx - (e.offsetX - initialX),
          CanvasHandler.getCoordinates().dy - (e.offsetY - initialY)
        );

        prevX = CanvasHandler.getCoordinates().dx + (e.offsetX - initialX);
        prevY = CanvasHandler.getCoordinates().dy + (e.offsetY - initialY);
      }
    };
  }, []);

  return (
    <section
      className={tw(
        'relative flex justify-center items-center relative',
        css({ '&': { gridArea: 'canvas' } })
      )}
      id="canvas"
    >
      <div className={tw('group relative bg-[#152222]')}>
        <div
          className={tw(
            'w-14 h-[28px] opacity-0 group-hover:opacity-100! bg-[#404F52] rounded-full absolute -top-[14px] left-[50%]',
            css({
              transform: 'translateX(-50%)',
              transition: '0.2s all ease-out',
            })
          )}
        ></div>
        <img
          alt="edited-img"
          ref={imageRef}
          className={tw('w-full h-full object-contain hidden')}
          src="https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"
        />

        <canvas
          className={tw(css({ '&': { transition: '0.3s all ease-out' } }))}
          ref={canvasRef}
        ></canvas>
      </div>
    </section>
  );
};
