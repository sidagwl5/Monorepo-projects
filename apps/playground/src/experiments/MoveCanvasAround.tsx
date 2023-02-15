import { css, tw } from 'twind/style';
import { useEffect } from 'react';

const MoveCanvasAround = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const parent = document.getElementById('parent') as HTMLCanvasElement;

    let initialX = 0;
    let lastX = 0;
    let move = false;

    canvas.onmousedown = (e) => {
      move = true;
      initialX = e.offsetX;
    };

    canvas.onmouseup = (e) => {
      move = false;
      lastX = lastX + e.offsetX - initialX;
    };

    canvas.onmouseleave = (e) => {
      move = false;
      lastX = lastX + e.offsetX - initialX;
    };

    canvas.onmousemove = (e) => {
      if (move) {
        canvas.style.left = `${
          parseInt(canvas.style.left || window.getComputedStyle(canvas).left) +
          e.movementX
        }px`;

        canvas.style.top = `${
          parseInt(canvas.style.top || window.getComputedStyle(canvas).top) +
          e.movementY
        }px`;
      }
    };
  }, []);

  return (
    <div
      className={tw(
        'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
      )}
    >
      <div
        id="parent"
        className={tw(
          'h-full flex-1 relative flex justify-center items-center',
          css({ background: '#1b1b1b' })
        )}
      >
        <canvas
          className={tw(
            'relative',
            css({
              width: '100px',
              height: '100px',
              // transition: '0.3s all ease-out',
              background: 'rgba(255, 255, 255, 0.08)',
            })
          )}
          id="canvas"
        />
      </div>
    </div>
  );
};

export default MoveCanvasAround;
