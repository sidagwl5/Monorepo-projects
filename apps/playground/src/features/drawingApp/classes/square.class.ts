import { Canvas } from './canvas.class';

interface IcontextConfig {
  lineWidth: number;
  strokeStyle: string;
  lineJoin: string;
  lineCap: string;

  globalCompositeOperation: string;
}

export class Square {
  private contextConfig: IcontextConfig;

  private initialX: number;
  private initialY: number;

  private finalPoint: number;
  constructor(_initialX: number, _initialY: number) {
    this.initialX = _initialX;
    this.initialY = _initialY;

    this.contextConfig = Canvas.getGlobalContextConfig();
    Canvas.getElements().context.moveTo(this.initialX, this.initialY);
  }

  addFinalPoints(_finalX: number, _finalY: number) {
    const { context } = Canvas.getElements();

    const finalX = _finalX - this.initialX;
    const finalY = _finalY - this.initialY;
    const length = finalX > finalY ? finalX : finalY;

    this.finalPoint = length;

    Canvas.clearCanvas();
    Canvas.putImageData();
    context.strokeRect(
      this.initialX,
      this.initialY,
      this.finalPoint,
      this.finalPoint
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
      this.finalPoint,
      this.finalPoint
    );

    context.stroke();
    context.restore();
  }
}
