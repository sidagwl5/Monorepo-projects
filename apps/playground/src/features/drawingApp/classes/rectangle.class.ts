import { Canvas } from './canvas.class';

interface IcontextConfig {
  lineWidth: number;
  strokeStyle: string;
  lineJoin: string;
  lineCap: string;
  globalCompositeOperation: string;
}

export class Rectangle {
  private contextConfig: IcontextConfig;

  private initialX: number;
  private initialY: number;

  private finalX: number;
  private finalY: number;

  constructor(_initialX: number, _initialY: number) {
    this.initialX = _initialX;
    this.initialY = _initialY;

    this.contextConfig = Canvas.getGlobalContextConfig();
    Canvas.getElements().context.moveTo(this.initialX, this.initialY);
  }

  addFinalPoints(_finalX: number, _finalY: number) {
    const { context } = Canvas.getElements();

    this.finalX = _finalX;
    this.finalY = _finalY;

    Canvas.clearCanvas();
    Canvas.putImageData();
    context.strokeRect(
      this.initialX,
      this.initialY,
      this.finalX - this.initialX,
      this.finalY - this.initialY
    );

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

    context.strokeRect(
      this.initialX,
      this.initialY,
      this.finalX - this.initialX,
      this.finalY - this.initialY
    );

    context.stroke();
    context.restore();
  }
}
