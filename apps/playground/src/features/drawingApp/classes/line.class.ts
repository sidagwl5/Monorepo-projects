import { Canvas } from './canvas.class';

export class Doodle {
  private smoothness = false;
  readonly id: string = crypto.randomUUID();
  private points: { x: number; y: number }[] = [];

  addPoints(_x: number, _y: number) {
    this.points.push({ x: _x, y: _y });
  }

  isSelected(_x: number, _y: number) {
    const { canvas } = Canvas.getElements();

    const backupCanvas = document.createElement('canvas');
    const backupContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    backupCanvas.width = canvas.width;
    backupCanvas.height = canvas.height;

    backupContext.strokeStyle = 'white';
    backupContext.lineWidth = 4;
    backupContext.lineJoin = 'round';
    backupContext.lineCap = 'round';

    backupContext.beginPath();
    backupContext.moveTo(this.points[0].x, this.points[0].y);

    this.points.forEach(({ x, y }) => {
      backupContext.lineTo(x, y);
    });

    const result = backupContext.isPointInStroke(_x, _y);

    backupCanvas.remove();
    return result;
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

  getPoints() {
    return this.points;
  }

  addSmoothness() {
    const { context } = Canvas.getElements();

    context.beginPath();

    Canvas.clearCanvas();
    Canvas.putImageData();
    context.moveTo(this.points[0].x, this.points[0].y);

    let i;
    for (i = 1; i < this.points.length - 2; i++) {
      const xc = (this.points[i].x + this.points[i + 1].x) / 2;
      const yc = (this.points[i].y + this.points[i + 1].y) / 2;
      context.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
    }
    // curve through the last two this.points
    context.quadraticCurveTo(
      this.points[i].x,
      this.points[i].y,
      this.points[i + 1].x,
      this.points[i + 1].y
    );

    this.smoothness = true;
    context.stroke();
  }

  isSmoothnessEnabled() {
    return this.smoothness;
  }

  drawAgain() {
    const { context } = Canvas.getElements();

    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);

    if (this.smoothness) {
      let i;
      for (i = 1; i < this.points.length - 2; i++) {
        const xc = (this.points[i].x + this.points[i + 1].x) / 2;
        const yc = (this.points[i].y + this.points[i + 1].y) / 2;
        context.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
      }
      // curve through the last two this.points
      context.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        this.points[i + 1].x,
        this.points[i + 1].y
      );
    } else
      this.points.forEach(({ x, y }) => {
        context.lineTo(x, y);
      });

    context.stroke();
  }
}
