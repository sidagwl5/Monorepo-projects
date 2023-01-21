/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { tw, css } from 'twind/style';
import Crop32Icon from '@mui/icons-material/Crop32';
import { useEffect, useState } from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropSquareIcon from '@mui/icons-material/CropSquare';

class Shape {
  x = 200;
  y = 200;
  shift = 5;
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

  changeDimensions = (_w: number, _h: number) => {
    console.log({ _h });
    this.w = _w;
    this.h = _h;
  };

  isHorizontalResizeValid = (_x: number) => {
    const left = _x - this.x > 0 && _x - this.x < this.shift;
    const right = this.x - _x + this.w > 0 && this.x - _x + this.w < this.shift;

    return left || right ? { left, right } : false;
  };

  resizeLeftSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x + _dx, this.y, this.w - _dx, this.h);
  };

  resizeTopSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y + _dy, this.w, this.h - _dy);
  };

  resizeBottomSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w, this.h + _dy);
  };

  resizeRightSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w + _dx, this.h);
  };

  isVerticalResizeValid = (_y: number) => {
    const top = _y - this.y > 0 && _y - this.y < this.shift;
    const bottom =
      this.y + this.h - _y > 0 && this.y + this.h - _y < this.shift;

    return top || bottom ? { top, bottom } : false;
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

  changeDimensions = (_w: number, _h: number) => {
    this.w = _w;
    this.h = _h;
  };

  resizeLeftSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x + _dx, this.y, this.w - _dx, this.h);
  };

  resizeTopSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y + _dy, this.w, this.h - _dy);
  };

  resizeBottomSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w, this.h + _dy);
  };

  isOverlapping = (_dx: number, _dy: number) => {
    const { x, w, y, h } = this;
    return x < _dx && x + w > _dx && y < _dy && y + h > _dy;
  };

  resizeRightSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w + _dx, this.h);
  };

  isHorizontalResizeValid = (_x: number) => {
    const left = _x - this.x > 0 && _x - this.x < this.shift;
    const right = this.x - _x + this.w > 0 && this.x - _x + this.w < this.shift;

    return left || right ? { left, right } : false;
  };

  isVerticalResizeValid = (_y: number) => {
    const top = _y - this.y > 0 && _y - this.y < this.shift;
    const bottom =
      this.y + this.h - _y > 0 && this.y + this.h - _y < this.shift;

    return top || bottom ? { top, bottom } : false;
  };
}

class Circle extends Shape {
  r = 20;
  w = 0;
  h = 0;

  constructor(c: string) {
    super(c);
  }

  createObject = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.fillStyle = this.c;
    context.arc(this.x, this.y, this.r, 0, 360);
    context.fill();
  };

  changeDimensions = (_w: number, _h: number) => {
    this.w = _w;
    this.h = _h;
  };

  resizeLeftSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x + _dx, this.y, this.w - _dx, this.h);
  };

  resizeTopSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y + _dy, this.w, this.h - _dy);
  };

  resizeBottomSize = (context: CanvasRenderingContext2D, _dy: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w, this.h + _dy);
  };

  isOverlapping = (_dx: number, _dy: number) => {
    const { x, y, r } = this;
    return x < _dx && x + 2 * r > _dx && y < _dy && y + 2 * r > _dy;
  };

  resizeRightSize = (context: CanvasRenderingContext2D, _dx: number) => {
    context.fillStyle = this.c;
    context?.fillRect(this.x, this.y, this.w + _dx, this.h);
  };

  isHorizontalResizeValid = (_x: number) => {
    return false;
  };

  isVerticalResizeValid = (_y: number) => {
    return false;
  };
}

export const ResizeShapesInCanvas = () => {
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

    const resizeLeftSide = (id: string | undefined, dx: number) => {
      shapes.forEach((obj) => {
        if (id === obj.id) obj.resizeLeftSize(context, dx);
        else obj.createObject(context);
      });
    };

    const resizeTopSide = (id: string | undefined, dy: number) => {
      shapes.forEach((obj) => {
        if (id === obj.id) obj.resizeTopSize(context, dy);
        else obj.createObject(context);
      });
    };

    const resizeBottomSide = (id: string | undefined, dy: number) => {
      shapes.forEach((obj) => {
        if (id === obj.id) obj.resizeBottomSize(context, dy);
        else obj.createObject(context);
      });
    };

    const resizeRightSide = (id: string | undefined, dx: number) => {
      shapes.forEach((obj) => {
        if (id === obj.id) obj.resizeRightSize(context, dx);
        else obj.createObject(context);
      });
    };

    const isHorizontalResizeValid = (dx: number) => {
      return [...shapes]
        .reverse()
        .map((obj) => {
          return obj.isHorizontalResizeValid(dx);
        })
        .find((v) => v);
    };

    const isVerticalResizeValid = (dy: number) => {
      return [...shapes]
        .reverse()
        .map((obj) => {
          return obj.isVerticalResizeValid(dy);
        })
        .find((v) => v);
    };

    renderShape();

    let draggable = false;

    let initialX = 0;
    let initialY = 0;

    let lastX = 0;
    let lastY = 0;

    let finalX = 0;
    let finalY = 0;

    let resize: any = false;
    let current: Rectangle | Circle | Square | undefined;

    canvas.onmousedown = (e) => {
      current = isShapeOverlapping(e.offsetX, e.offsetY);

      if (current) {
        const isHorizontalValid = isHorizontalResizeValid(e.offsetX);
        const isVerticalValid = isVerticalResizeValid(e.offsetY);

        resize = isHorizontalValid || isVerticalValid;
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

        if (resize) {
          if (resize?.left) {
            canvas.style.cursor = 'w-resize';
            resizeLeftSide(current?.id, e.offsetX - initialX);
          } else if (resize?.right) {
            canvas.style.cursor = 'w-resize';
            resizeRightSide(current?.id, e.offsetX - initialX);
          }
          if (resize?.top) {
            canvas.style.cursor = 's-resize';
            resizeTopSide(current?.id, e.offsetY - initialY);
          } else if (resize?.bottom) {
            canvas.style.cursor = 's-resize';
            resizeBottomSide(current?.id, e.offsetY - initialY);
          }
        } else {
          updateShapePositions(
            current?.id,
            lastX + e.offsetX - initialX,
            lastY + e.offsetY - initialY
          );
        }

        finalX = e.offsetX;
        finalY = e.offsetY;
      } else {
        const isHorizontalValid = isHorizontalResizeValid(e.offsetX);
        const isVerticalValid = isVerticalResizeValid(e.offsetY);

        const current = isShapeOverlapping(e.offsetX, e.offsetY);
        if (current && isHorizontalValid) {
          canvas.style.cursor = 'w-resize';
        } else if (current && isVerticalValid) {
          canvas.style.cursor = 's-resize';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };

    canvas.onmouseup = (e) => {
      if (draggable) {
        if (resize) {
          const _current = current!;
          if (resize.left) {
            _current.changeDimensions(
              _current.w - (finalX - initialX),
              _current.h
            );
            _current.changeCoordinates(
              _current.x + finalX - initialX,
              _current.y
            );
          } else if (resize.right) {
            _current.changeDimensions(
              _current.w + finalX - initialX,
              _current.h
            );
          } else if (resize.top) {
            _current.changeDimensions(
              _current.w,
              _current.h - (finalY - initialY)
            );
            _current.changeCoordinates(
              _current.x,
              _current.y + finalY - initialY
            );
          } else if (resize.bottom) {
            _current.changeDimensions(
              _current.w,
              _current.h + finalY - initialY
            );
          }
        }

        draggable = false;
        resize = false;

        canvas.style.border = 'none';
        canvas.style.cursor = 'default';
      }
    };

    canvas.onmouseleave = (e) => {
      if (draggable) {
        if (resize) {
          const _current = current!;
          if (resize.left) {
            _current.changeDimensions(
              _current.w - (finalX - initialX),
              _current.h
            );
            _current.changeCoordinates(
              _current.x + finalX - initialX,
              _current.y
            );
          } else if (resize.right) {
            _current.changeDimensions(
              _current.w + finalX - initialX,
              _current.h
            );
          } else if (resize.top) {
            _current.changeDimensions(
              _current.w,
              _current.h - (finalY - initialY)
            );
            _current.changeCoordinates(
              _current.x,
              _current.y + finalY - initialY
            );
          } else if (resize.bottom) {
            _current.changeDimensions(
              _current.w,
              _current.h + finalY - initialY
            );
          }
        }

        draggable = false;
        resize = false;

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
