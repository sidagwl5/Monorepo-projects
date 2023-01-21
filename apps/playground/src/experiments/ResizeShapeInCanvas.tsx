import { useEffect, useRef } from 'react';
import { tw } from 'twind';

export const ResizeShapeInCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<any[]>([
    {
      id: 0,
      x: 100,
      y: 100,
      w: 100,
      h: 100,
      c: 'blue',
    },
  ]);

  useEffect(() => {
    canvasRef.current.style.background = 'white';
    canvasRef.current.width = 800;
    canvasRef.current.height = 600;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvasRef.current?.getContext('2d');

    const obj = {
      id: 0,
      x: 100,
      y: 100,
      w: 100,
      h: 100,
      c: 'blue',
    };

    const { x, y, w, h, c } = obj;

    context.fillStyle = c;
    context?.fillRect(x, y, w, h);

    let draggable = false;
    let resize = false;

    let shift = 6;

    let initialX = x;
    let initialY = y;

    let lastX = x;
    let lastY = y;

    let finalX = 0;
    let finalY = 0;

    let width = w;
    let height = h;

    canvas.onmousedown = (e) => {
      if (
        lastX < e.offsetX &&
        lastX + width > e.offsetX &&
        lastY < e.offsetY &&
        lastY + height > e.offsetY
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
        context?.clearRect(
          0,
          0,
          canvasRef.current?.width,
          canvasRef.current?.height
        );

        if (initialX - lastX < shift || lastX - initialX + width < shift) {
          resize = true;
          let dx = e.offsetX - initialX;

          if (lastX - initialX + width < shift) {
            canvasRef.current.style.cursor = 'w-resize';
            context.fillStyle = obj.c;
            context?.fillRect(lastX, lastY, width + dx, height);
            finalX = e.offsetX;
            finalY = e.offsetY;
          } else {
            canvasRef.current.style.cursor = 'w-resize';
            context.fillStyle = obj.c;
            context?.fillRect(lastX + dx, lastY, width - dx, height);
            finalX = e.offsetX;
            finalY = e.offsetY;
          }

          return;
        } else if (
          initialY - lastY < shift ||
          lastY - initialY + height < shift
        ) {
          resize = true;
          let dy = e.offsetY - initialY;

          if (lastY - initialY + height < shift) {
            canvasRef.current.style.cursor = 'w-resize';
            context.fillStyle = obj.c;
            context?.fillRect(lastX, lastY, width, height + dy);
            finalX = e.offsetX;
            finalY = e.offsetY;
          } else {
            canvasRef.current.style.cursor = 'w-resize';
            context.fillStyle = obj.c;
            context?.fillRect(lastX, lastY + dy, width, height - dy);
            finalX = e.offsetX;
            finalY = e.offsetY;
          }

          canvasRef.current.style.cursor = 's-resize';
        } else {
          context.fillStyle = obj.c;
          context?.fillRect(
            lastX + e.offsetX - initialX,
            lastY + e.offsetY - initialY,
            width,
            height
          );

          finalX = e.offsetX;
          finalY = e.offsetY;
        }
      } else {
        if (
          lastX < e.offsetX &&
          lastX + width > e.offsetX &&
          lastY < e.offsetY &&
          lastY + height > e.offsetY &&
          (e.offsetX - lastX < shift || lastX + width - e.offsetX < shift)
        ) {
          canvasRef.current.style.cursor = 'w-resize';
        } else if (
          lastX < e.offsetX &&
          lastX + width > e.offsetX &&
          lastY < e.offsetY &&
          lastY + height > e.offsetY &&
          (e.offsetY - lastY < shift || lastY + height - e.offsetY < shift)
        ) {
          canvasRef.current.style.cursor = 's-resize';
        } else {
          canvasRef.current.style.cursor = 'default';
        }
      }
    };

    canvas.onmouseup = (e) => {
      if (draggable) {
        if (resize) {
          if (initialX - lastX < shift || lastX - initialX + width < shift) {
            if (lastX - initialX + width < shift) {
              width = width + finalX - initialX;
            } else {
              width = width - (finalX - initialX);
              lastX = lastX + finalX - initialX;
            }
          } else if (
            initialY - lastY < shift ||
            lastY - initialY + height < shift
          ) {
            if (lastY - initialY + height < shift) {
              height = height + finalY - initialY;
            } else {
              height = height - (finalY - initialY);
              lastY = lastY + finalY - initialY;
            }
          }
        } else {
          lastX = lastX + finalX - initialX;
          lastY = lastY + finalY - initialY;
        }

        resize = false;
        draggable = false;
        canvas.style.border = 'none';
        canvas.style.cursor = 'default';
      }
    };

    canvas.onmouseleave = (e) => {
      if (draggable) {
        draggable = false;
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
      <canvas ref={canvasRef} />
    </main>
  );
};
