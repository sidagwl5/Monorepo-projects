import { Canvas } from './canvas.class';

interface IcontextConfig {
  lineWidth: number;
  strokeStyle: string;
  lineJoin: string;
  lineCap: string;

  globalCompositeOperation: string;
}

export class Circle {
  private contextConfig: IcontextConfig;

  private initialX: number;
  private initialY: number;
  private radius: number;

  constructor(_initialX: number, _initialY: number) {
    this.initialX = _initialX;
    this.initialY = _initialY;

    this.contextConfig = Canvas.getGlobalContextConfig();
    Canvas.getElements().context.moveTo(this.initialX, this.initialY);
  }

  addFinalPoints(_finalX: number, _finalY: number) {
    const { context } = Canvas.getElements();

    context.beginPath();

    const finalX = Math.abs(_finalX - this.initialX);
    const finalY = Math.abs(_finalY - this.initialY);
    const radius = finalX > finalY ? finalX : finalY;

    this.radius = radius;

    Canvas.clearCanvas();
    Canvas.putImageData();

    context.arc(this.initialX, this.initialY, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }

  isSelected() {
    console.log('called');
  }

  drawAgain() {
    const { context } = Canvas.getElements();

    context.save();
    context.beginPath();
    context.moveTo(this.initialX, this.initialY);

    Object.keys(this.contextConfig).forEach((key) => {
      context[key] = this.contextConfig[key];
    });

    context.arc(this.initialX, this.initialY, this.radius, 0, 2 * Math.PI);

    context.stroke();
    context.restore();
  }
}
