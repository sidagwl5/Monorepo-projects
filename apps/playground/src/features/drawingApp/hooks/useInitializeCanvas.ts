import { useDrawingContext } from './../Context';
import { useEffect } from 'react';

export const useInitializeCanvas = () => {
  const { drawSettings, currentTab, eraserSettings, canvasSettings } =
    useDrawingContext();

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    if (currentTab === 'eraser')
      context.globalCompositeOperation = 'destination-out';
    else context.globalCompositeOperation = 'source-over';
  }, [currentTab]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (currentTab === 'eraser') {
      context.lineWidth = Number(eraserSettings.width);
    } else {
      context.lineWidth = Number(drawSettings.width);
    }
  }, [currentTab, drawSettings.width, eraserSettings.width]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (context) {
      context.strokeStyle = drawSettings.color;
      context.lineJoin = drawSettings.round_line_join ? 'round' : 'miter';
      context.lineCap = drawSettings.round_line_cap ? 'round' : 'butt';
    }
  }, [drawSettings]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.style.backgroundColor = canvasSettings.bg_color;
  }, [canvasSettings.bg_color]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let coordinates: any[] = [];
    let snapshot: ImageData | null = null;
    let drawable = false;

    const onDrawingStop = () => {
      if (drawable) {
        if (coordinates.length > 1 && drawSettings.smooth_line) {
          context.beginPath();
          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          if (snapshot) context.putImageData(snapshot, 0, 0);
          context.moveTo(coordinates[0].x, coordinates[0].y);

          let i;
          for (i = 1; i < coordinates.length - 2; i++) {
            const xc = (coordinates[i].x + coordinates[i + 1].x) / 2;
            const yc = (coordinates[i].y + coordinates[i + 1].y) / 2;
            context.quadraticCurveTo(
              coordinates[i].x,
              coordinates[i].y,
              xc,
              yc
            );
          }
          // curve through the last two coordinates
          context.quadraticCurveTo(
            coordinates[i].x,
            coordinates[i].y,
            coordinates[i + 1].x,
            coordinates[i + 1].y
          );

          context.stroke();
        }

        snapshot = null;
        canvasElement.style.border = 'none';
        drawable = false;
        coordinates = [];
        context.beginPath();
      }
    };

    canvasElement.onmousedown = (e) => {
      snapshot = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawable = true;
      context.moveTo(e.offsetX, e.offsetY);
      coordinates.push({ x: e.offsetX, y: e.offsetY });

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = onDrawingStop;

    canvasElement.onmouseleave = onDrawingStop;

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        coordinates.push({ x: e.offsetX, y: e.offsetY });
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    };
  }, [drawSettings.smooth_line]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

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

  return null;
};