interface IcontextConfig {
  lineWidth: number;
  strokeStyle: string;
  lineJoin: string;
  lineCap: string;
  globalCompositeOperation: string;
}

export class Canvas {
  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;
  private static globalContextConfig: IcontextConfig;
  static imageData: ImageData;

  static initialize(_canvas: HTMLCanvasElement) {
    Canvas.canvas = _canvas;
    Canvas.context = _canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
  }

  static updateContextConfig(_config: IcontextConfig) {
    const {
      globalCompositeOperation,
      lineCap,
      lineJoin,
      lineWidth,
      strokeStyle,
    } = _config;

    Canvas.context.globalCompositeOperation =
      globalCompositeOperation as GlobalCompositeOperation;
    Canvas.context.lineCap = lineCap ? 'round' : 'square';
    Canvas.context.lineJoin = lineJoin ? 'round' : 'miter';
    Canvas.context.lineWidth = lineWidth;
    Canvas.context.strokeStyle = strokeStyle;

    Canvas.globalContextConfig = _config;
  }

  static getGlobalContextConfig() {
    return Canvas.globalContextConfig;
  }

  static getElements() {
    return { canvas: this.canvas, context: this.context };
  }

  static clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static storeImageData() {
    this.imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  static getImageData() {
    return this.imageData;
  }

  static mockCanvasBgColor(
    _color: string,
    hook: (_canvas: HTMLCanvasElement) => void
  ) {
    this.context.save();
    this.context.globalCompositeOperation = 'destination-over';
    this.context.fillStyle = _color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();

    hook(this.canvas);

    Canvas.putImageData();
  }

  static putImageData() {
    if (this.imageData) this.context.putImageData(this.imageData, 0, 0);
  }

  static async loadImgURLToCanvas(_url: string) {
    return new Promise((resolve, reject) => {
      const imageElement = new Image();
      imageElement.src = 'anonymous';

      imageElement.src = _url;

      imageElement.onload = () => {
        this.context.drawImage(imageElement, 0, 0);
        this.storeImageData();

        resolve(true);
      };

      imageElement.onerror = reject;
    });
  }
}
