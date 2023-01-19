import { useEffect, useRef } from 'react';
import { tw } from 'twind';

export const CanvasMoveMultipleShapes = () => {
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
    {
      id: 1,
      x: 100,
      y: 200,
      w: 200,
      h: 100,
      c: 'yellow',
    },
    {
      id: 2,
      x: 400,
      y: 400,
      w: 200,
      h: 100,
      c: 'red',
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

    const renderShape = () => {
      shapesRef.current.forEach(({ x, y, w, h, c }) => {
        context.fillStyle = c;
        context?.fillRect(x, y, w, h);
      });
    };

    const isShapeOverlapping = (dx: number, dy: number) => {
      return [...shapesRef.current].reverse().find(({ x, y, w, h, c }) => {
        return x < dx && x + w > dx && y < dy && y + h > dy;
      });
    };

    const updateShapePositions = (
      id: number | undefined,
      dx: number,
      dy: number
    ) => {
      shapesRef.current.forEach((obj) => {
        if (id === obj.id) {
          obj.x = dx;
          obj.y = dy;
        }

        context.fillStyle = obj.c;
        context?.fillRect(obj.x, obj.y, obj.w, obj.h);
      });
    };

    renderShape();

    let draggable = false;

    let initialX = 0;
    let initialY = 0;

    let lastX = 0;
    let lastY = 0;

    let finalX = 0;
    let finalY = 0;

    let snapshot;
    let current;

    canvas.onmousedown = (e) => {
      current = isShapeOverlapping(e.offsetX, e.offsetY);

      if (current) {
        draggable = true;
        initialX = e.offsetX;
        initialY = e.offsetY;
        lastX = current.x;
        lastY = current.y;
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
        updateShapePositions(
          current?.id,
          lastX + e.offsetX - initialX,
          lastY + e.offsetY - initialY
        );

        finalX = e.offsetX;
        finalY = e.offsetY;
      }
    };

    canvas.onmouseup = (e) => {
      if (draggable) {
        draggable = false;
        lastX = lastX + finalX - initialX;
        lastY = lastY + finalY - initialY;
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
