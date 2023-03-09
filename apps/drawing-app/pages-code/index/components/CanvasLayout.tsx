import { Canvas } from 'apps/drawing-app/classes/canvas.class';
import { css, tw } from 'twind/style';
import { useEffect } from 'react';
import { useDrawingContext } from '../Context';

const CanvasLayout = () => {
  const {
    handleCurrentAspectRatio: [currentAspectRatio],
  } = useDrawingContext();

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();
    const canvasContainer = document.getElementById('canvas_container');

    if (canvasContainer) {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      let elementWidth;
      let elementHeight;

      const scale = 2;
      const diff = 0;

      elementWidth = width - diff;
      elementHeight = (1 / currentAspectRatio) * elementWidth;

      if (elementHeight > height) {
        elementHeight = height - diff;
        elementWidth = currentAspectRatio * elementHeight;
      }

      context.save();
      canvas.style.width = `${elementWidth}px`;
      canvas.style.height = `${elementHeight}px`;

      canvas.width = elementWidth * scale;
      canvas.height = elementHeight * scale;

      context.restore();

      const progress = localStorage.getItem('progress');
      if (progress) {
        Canvas.loadImgURLToCanvas(progress).finally(() => {
          context.scale(scale, scale);
        });
      } else context.scale(scale, scale);
    }
  }, []);

  return (
    <div
      id="canvas_container"
      className={tw('flex-1 flex justify-center relative items-center')}
    >
      <canvas
        ref={Canvas.initialize}
        className={tw(
          'relative',
          css({
            transition: '0.3s background ease-out',
            background: 'rgba(255, 255, 255, 0.08)',
          })
        )}
        id="canvas"
      />
    </div>
  );
};

export default CanvasLayout;
