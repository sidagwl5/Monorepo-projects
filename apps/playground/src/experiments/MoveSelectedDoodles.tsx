import { useEffect, useRef, useState } from 'react';
import { css, tw } from 'twind/style';

class Line {
  readonly id: string = crypto.randomUUID();

  private points: { x: number; y: number }[] = [];

  addPoints(x: number, y: number) {
    this.points.push({ x, y });
  }

  isSelected(_x: number, _y: number) {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvasElement.width;
    canvas.height = canvasElement.height;

    context.strokeStyle = 'white';
    context.lineWidth = 4;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);

    this.points.forEach(({ x, y }) => {
      context.lineTo(x, y);
    });

    const result = context.isPointInStroke(_x, _y);

    canvas.remove();

    return result;
    // return this.points.find(({ x, y }) => x === _x && y === _y);
  }

  calculateBoxDimensions() {
    return this.points.reduce(
      (prev, curr) => {
        if (prev.x_max < curr.x) prev.x_max = curr.x;
        if (prev.y_max < curr.y) prev.y_max = curr.y;
        if (prev.y_min > curr.y) prev.y_min = curr.y;
        if (prev.x_min > curr.x) prev.x_min = curr.x;

        return prev;
      },
      { x_max: 0, y_max: 0, x_min: Infinity, y_min: Infinity }
    );
  }

  isCursorInside(_x: number, _y: number) {
    const { x_max, x_min, y_max, y_min } = this.calculateBoxDimensions();

    return x_max > _x && x_min < _x && y_max > _y && y_min < _y;
  }

  move(_x: number, _y: number) {
    this.points.forEach((point) => {
      point.x = point.x + _x;
      point.y = point.y + _y;
    });
  }

  getPoints() {
    return this.points;
  }
}

export const MoveSelectedDoodles = () => {
  const [draw, setDraw] = useState(true);
  const coordinatesRef = useRef<Line[]>([]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.style.width = String(window.innerWidth / 2.5);
    canvasElement.style.height = String((canvasElement.width * 3) / 4);

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let drawable = false;
    let line: Line;
    let move = false;
    let lineSelected: Line | undefined;
    let imageData: ImageData;

    canvasElement.onmousedown = (e) => {
      if (draw) {
        context.strokeStyle = 'white';
        context.lineWidth = 4;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        drawable = true;
        line = new Line();
        coordinatesRef.current.push(line);

        line.addPoints(e.offsetX, e.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();

        canvasElement.style.border = '1px yellow solid';
      } else {
        if (imageData) context.putImageData(imageData, 0, 0);
        const _lineSelected = coordinatesRef.current.find((line) =>
          line.isSelected(e.offsetX, e.offsetY)
        );

        if (_lineSelected) {
          lineSelected = _lineSelected;
          imageData = context.getImageData(
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );

          context.save();
          context.strokeStyle = 'yellow';
          context.lineWidth = 2;

          const { x_max, x_min, y_max, y_min } =
            lineSelected.calculateBoxDimensions();
          context.strokeRect(
            x_min - 2,
            y_min - 2,
            x_max - x_min + 4,
            y_max - y_min + 4
          );

          context.restore();
        }

        if (lineSelected) {
          move = lineSelected.isCursorInside(e.offsetX, e.offsetY);
        }
      }
    };

    canvasElement.onmouseup = (e) => {
      context.beginPath();
      canvasElement.style.border = 'none';
      if (drawable) {
        drawable = false;
        imageData = context.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
      } else if (move) {
        imageData = context.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        move = false;
      }
    };

    canvasElement.onmouseleave = (e) => {
      context.beginPath();
      drawable = false;
      canvasElement.style.border = 'none';
    };

    canvasElement.onmousemove = (e) => {
      console.log(move);
      if (drawable) {
        line.addPoints(e.offsetX, e.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      } else if (move) {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        lineSelected.move(e.movementX, e.movementY);

        const points = lineSelected.getPoints();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        points.forEach((v) => {
          context.lineTo(v.x, v.y);
        });

        context.stroke();
      }
    };

    window.onkeydown = (e) => {
      if (e.code === 'Delete') {
        if (lineSelected) {
          const canvasElement = document.getElementById(
            'canvas'
          ) as HTMLCanvasElement;

          const context = canvasElement.getContext(
            '2d'
          ) as CanvasRenderingContext2D;

          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          coordinatesRef.current = coordinatesRef.current.filter(
            (v) => v.id !== lineSelected?.id
          );

          coordinatesRef.current.forEach((v) => {
            const points = v.getPoints();

            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            points.forEach((v) => {
              context.lineTo(v.x, v.y);
            });

            context.stroke();
          });

          imageData = context.getImageData(
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
        }
      }
    };
  }, [draw]);

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
      <button className={tw('text-white')} onClick={setDraw.bind(this, !draw)}>
        {draw ? 'Eraser' : 'Draw'}
      </button>
    </div>
  );
};
