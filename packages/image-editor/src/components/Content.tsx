import { tw, css } from 'twind/style';
import { useEffect, useRef } from 'react';

export const Content = ({ data }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      const canvasElement = canvasRef.current as HTMLCanvasElement;
      canvasElement.width = imageRef.current?.width as number;
      canvasElement.height = imageRef.current?.height as number;

      const context = canvasElement.getContext('2d');

      context?.drawImage(imageRef.current as HTMLImageElement, 0, 0);
      clearInterval(interval);
    }, 1000);
  }, []);

  useEffect(() => {
    if (data && imageRef.current) {
      const filters = data.options
        .map((v: any) => `${v.property}(${v.props.value}${v.units})`)
        .join(' ');

      const canvasElement = canvasRef.current as HTMLCanvasElement;
      canvasElement.width = imageRef.current?.width as number;
      canvasElement.height = imageRef.current?.height as number;

      const context = canvasElement.getContext(
        '2d'
      ) as CanvasRenderingContext2D;
      context.filter = filters;
      context?.drawImage(imageRef.current as HTMLImageElement, 0, 0);
    }
  }, [data]);

  return (
    <section
      className={tw(
        'w-15 relative flex justify-center items-center',
        css({ '&': { gridArea: 'canvas' } })
      )}
      id="canvas"
    >
      <div
        className={tw('max-w-[640px] w-full max-h-[360px] h-full bg-[#152222]')}
      >
        <img
          alt="edited-img"
          ref={imageRef}
          className={tw('w-full h-full object-contain hidden')}
          src="https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"
        />

        <canvas
          className={tw('object-contain w-full h-full')}
          ref={canvasRef}
        ></canvas>
      </div>
    </section>
  );
};
