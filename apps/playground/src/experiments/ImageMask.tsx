import { useEffect, useRef } from 'react';
import { tw } from 'twind';

export const CanvasImageCrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvasRef.current?.getContext('2d');

    context?.fillRect(200, 100, 200, 200);

    let draggable = false;

    let initialX = 0;
    let initialY = 0;

    let lastX = 200;
    let lastY = 100;

    let finalX = 0;
    let finalY = 0;

    canvas.onmousedown = (e) => {
      if (
        e.offsetX > lastX &&
        e.offsetX < lastX + 200 &&
        e.offsetY > lastY &&
        e.offsetY < lastY + 200
      ) {
        draggable = true;
        initialX = e.offsetX;
        initialY = e.offsetY;
        canvas.style.border = '1px yellow solid';
        canvas.style.cursor = 'grabbing';
      }
    };

    canvas.onmousemove = (e) => {
      if (draggable) {
        context.globalCompositeOperation = 'source-over';
        context?.drawImage(
          imageRef.current,
          0,
          0,
          canvasRef.current?.width,
          canvasRef.current?.height
        );

        context.globalCompositeOperation = 'source-in';
        context?.fillRect(
          lastX + e.offsetX - initialX,
          lastY + e.offsetY - initialY,
          200,
          200
        );
        context?.drawImage(
          imageRef.current,
          0,
          0,
          canvasRef.current?.width,
          canvasRef.current?.height
        );

        finalX = e.offsetX;
        finalY = e.offsetY;
      }
    };

    canvas.onmouseup = (e) => {
      if (draggable) {
        draggable = false;
        context.globalCompositeOperation = 'source-over';
        lastX = lastX + finalX - initialX;
        lastY = lastY + finalY - initialY;
        canvas.style.border = 'none';
        canvas.style.cursor = 'default';
      }
    };

    canvas.onmouseleave = (e) => {
      if (draggable) {
        draggable = false;
        context.globalCompositeOperation = 'source-over';
        lastX = lastX + finalX - initialX;
        lastY = lastY + finalY - initialY;
        canvas.style.border = 'none';
        canvas.style.cursor = 'default';
      }
    };
  }, []);

  return (
    <main
      className={tw(
        'w-full h-screen bg-[#1b1b1b] flex justify-center items-center'
      )}
    >
      <img
        alt="canvas"
        ref={imageRef}
        className={tw('hidden')}
        onLoad={(e) => {
          const context = canvasRef.current.getContext(
            '2d'
          ) as CanvasRenderingContext2D;

          const width = 600;
          const aspectRatio =
            e.currentTarget.naturalWidth / e.currentTarget.naturalHeight;

          const height = width * (1 / aspectRatio);

          canvasRef.current.width = width;
          canvasRef.current.height = height;

          context.drawImage(imageRef.current, 0, 0, width, height);
        }}
        src={'https://wallpaper.dog/large/901159.jpg'}
      />
      <canvas ref={canvasRef} />
    </main>
  );
};
