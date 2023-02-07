import { Canvas } from './canvas.class';

interface IcontextConfig {
  lineWidth: number;
  strokeStyle: string;
  lineJoin: string;
  lineCap: string;
  globalCompositeOperation: string;
}

export class Doodle {
  static globalContextConfig: Partial<IcontextConfig>;
  private smoothness = false;
  readonly id: string = crypto.randomUUID();
  private points: { x: number; y: number }[] = [];
  private contextConfig: Partial<IcontextConfig>;

  constructor() {
    console.log(Doodle.globalContextConfig);
    this.contextConfig = Doodle.globalContextConfig;
  }

  static updateContextConfig(_config: Partial<IcontextConfig>) {
    if (!Doodle.globalContextConfig) {
      Doodle.globalContextConfig = _config;
    } else
      Doodle.globalContextConfig = {
        ...Doodle.globalContextConfig,
        ..._config,
      };
  }

  addPoints(_x: number, _y: number) {
    this.points.push({ x: _x, y: _y });
  }

  isSelected(_x: number, _y: number) {
    const { canvas } = Canvas.getElements();

    const backupCanvas = document.createElement('canvas');
    const backupContext = backupCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    backupCanvas.width = canvas.width;
    backupCanvas.height = canvas.height;

    backupContext.lineWidth = this.contextConfig.lineWidth + 5;
    backupContext.lineJoin = this.contextConfig.lineJoin;
    backupContext.lineCap = this.contextConfig.lineCap;

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

    context.save();
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);

    Object.keys(this.contextConfig).forEach((key) => {
      context[key] = this.contextConfig[key];
    });

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
    context.restore();
    context.beginPath();
  }
}