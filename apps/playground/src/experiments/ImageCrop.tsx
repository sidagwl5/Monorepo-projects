import { useEffect, useRef } from 'react';
import { tw } from 'twind/style';

export const ImageCrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log(canvasRef.current);

    // canvasRef.current.width = 300;
    // canvasRef.current.height = 150;

    canvasRef.current.getContext('2d')?.beginPath();
    canvasRef.current.getContext('2d').fillStyle = 'red';
    //   canvasRef.current
    //     ?.getContext('2d')
    //     ?.fillRect(
    //       50,
    //       50,
    //       canvasRef.current.width / 2,
    //       canvasRef.current.height / 2
    //     );
    canvasRef.current?.getContext('2d')?.arc(200, 200, 150, 0, 2 * Math.PI);
    canvasRef.current?.getContext('2d')?.fill();
    // canvasRef.current.getContext('2d').globalAlpha = 1;

    // canvasRef.current.getContext('2d').globalCompositeOperation =
    //   'destination-out';

    canvasRef.current.getContext('2d')?.beginPath();
    canvasRef.current.getContext('2d').fillStyle = 'blue';
    canvasRef.current?.getContext('2d')?.arc(50, 50, 100, 0, 2 * Math.PI);
    canvasRef.current?.getContext('2d')?.fill();
  }, []);

  return (
    <main
      className={tw(
        'w-full h-screen bg-[#1b1b1b] flex justify-center items-center'
      )}
    >
      <img
        alt="canvas"
        ref={imageRef}
        className={tw('hidden')}
        src={'https://wallpaper.dog/large/901159.jpg'}
      />
      <canvas style={{ background: 'yellow' }} ref={canvasRef} />
    </main>
  );
};
