import { tw, css } from 'twind/style';
import Crop32Icon from '@mui/icons-material/Crop32';
import { useEffect, useState } from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropSquareIcon from '@mui/icons-material/CropSquare';

class Shape {
  x = 200;
  y = 200;
  id = window.crypto.randomUUID();
  c = 'blue';

  constructor(c: string) {
    this.c = c;
  }

  changeCoordinates = (_dx: number, _dy: number) => {
    this.x = _dx;
    this.y = _dy;
  };
}

class Rectangle extends Shape {
  w = 100;
  h = 50;

  constructor(c: string) {
    super(c);
  }

  createObject = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.c;
    context.fillRect(this.x, this.y, this.w, this.h);
  };

  isOverlapping = (_dx: number, _dy: number) => {
    const { x, w, y, h } = this;
    return x < _dx && x + w > _dx && y < _dy && y + h > _dy;
  };
}

class Square extends Shape {
  w = 60;
  h = 60;

  constructor(c: string) {
    super(c);
  }

  createObject = (context: CanvasRenderingContext2D) => {
    context.fillStyle = this.c;
    context.fillRect(this.x, this.y, this.w, this.h);
  };

  isOverlapping = (_dx: number, _dy: number) => {
    const { x, w, y, h } = this;
    return x < _dx && x + w > _dx && y < _dy && y + h > _dy;
  };
}

class Circle extends Shape {
  r = 20;

  constructor(c: string) {
    super(c);
  }

  createObject = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.fillStyle = this.c;
    context.arc(this.x, this.y, this.r, 0, 360);
    context.fill();
  };

  isOverlapping = (_dx: number, _dy: number) => {
    const { x, y, r } = this;
    return x < _dx && x + 2 * r > _dx && y < _dy && y + 2 * r > _dy;
  };
}

export const HtmlElementsDragDrop = () => {
  const [shapes, setShapes] = useState<(Rectangle | Circle | Square)[]>([]);

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
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const renderShape = () => {
      shapes.forEach((obj) => {
        obj.createObject(context);
      });
    };

    const isShapeOverlapping = (dx: number, dy: number) => {
      return [...shapes].reverse().find((obj) => {
        return obj.isOverlapping(dx, dy);
      });
    };

    const updateShapePositions = (
      id: string | undefined,
      dx: number,
      dy: number
    ) => {
      shapes.forEach((obj) => {
        if (id === obj.id) obj.changeCoordinates(dx, dy);
        obj.createObject(context);
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
        context?.clearRect(0, 0, canvas?.width, canvas?.height);
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
  }, [shapes]);

  return (
    <div
      className={tw(
        'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
      )}
    >
      <div
        className={tw(
          'h-full max-w-[250px] w-full p-4 flex flex-col gap-5',
          css({ background: 'rgba(255, 255, 255, 0.15)' })
        )}
      >
        <button
          onClick={() => {
            setShapes((prev) => [...prev, new Rectangle('blue')]);
          }}
          className={tw(
            'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
        >
          <Crop32Icon className={tw('text-[20px]!')} />
        </button>
        <button
          onClick={() => {
            setShapes((prev) => [...prev, new Circle('red')]);
          }}
          className={tw(
            'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
        >
          <PanoramaFishEyeIcon className={tw('text-[20px]!')} />
        </button>

        <button
          onClick={() => {
            setShapes((prev) => [...prev, new Square('yellow')]);
          }}
          className={tw(
            'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
        >
          <CropSquareIcon className={tw('text-[20px]!')} />
        </button>
      </div>
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
