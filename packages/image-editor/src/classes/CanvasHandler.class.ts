export class CanvasHandler {
  static image: HTMLImageElement;
  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;
  static canvasData: Record<string, any> = {
    flip: { x: false, y: false },
    filter: '',
    coordinates: { dx: 0, dy: 0 },
  };

  static initialize(_canvas: HTMLCanvasElement, _image: HTMLImageElement) {
    // initialize the canvas element, and add width,height for the image and draw it.
    CanvasHandler.image = _image;
    CanvasHandler.canvas = _canvas;
    CanvasHandler.context = _canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    CanvasHandler.canvas.width = CanvasHandler.image.width;
    CanvasHandler.canvas.height = CanvasHandler.image.height;
    CanvasHandler.drawImageOnCanvas();
  }

  static getCoordinates() {
    return this.canvasData.coordinates;
  }

  static setCoordinates(_dx: number, _dy: number) {
    this.canvasData.coordinates.dx = _dx;
    this.canvasData.coordinates.dy = _dy;
  }

  private static drawImageOnCanvas(_dx = 0, _dy = 0) {
    CanvasHandler.context.drawImage(CanvasHandler.image, _dx, _dy);
  }

  private static resetCanvas() {
    CanvasHandler.context.clearRect(
      0,
      0,
      CanvasHandler.image.width,
      CanvasHandler.image.height
    );
  }

  static applyFilter(_filter: string) {
    let width = this.canvasData.coordinates.dx;
    let height = this.canvasData.coordinates.dy;

    if (this.canvasData.flip.x) width = -(this.image.width + width);
    if (this.canvasData.flip.y) height = -(this.image.height + height);

    CanvasHandler.context.filter = _filter;
    this.canvasData.filter = _filter;
    CanvasHandler.drawImageOnCanvas(width, height);
  }

  static applyRotation(_rotate: number) {
    CanvasHandler.resetCanvas();
    CanvasHandler.context.rotate(_rotate);
    CanvasHandler.drawImageOnCanvas();
  }

  static applyScale(_x: number, _y: number) {
    CanvasHandler.context.scale(_x, _y);
    CanvasHandler.drawImageOnCanvas();
  }

  static applyVerticalFlip(_y = 1) {
    let width = 0;
    let height = 0;

    this.canvasData.flip.y = !this.canvasData.flip.y;

    if (this.canvasData.flip.x) width = -this.image.width;
    if (this.canvasData.flip.y) height = -this.image.height;

    this.context.scale(1, _y);
    this.drawImageOnCanvas(width, height);
  }

  static applyHorizontalFlip(_x = 1) {
    let width = this.canvasData.coordinates.dx;
    let height = this.canvasData.coordinates.dy;

    this.canvasData.flip.x = !this.canvasData.flip.x;

    if (this.canvasData.flip.x) width = -(this.image.width + width);
    if (this.canvasData.flip.y) height = -(this.image.height + height);

    this.context.scale(_x, 1);
    this.drawImageOnCanvas(width, height);
  }
}
