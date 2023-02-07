import { useEffect, useState } from 'react';
import { tw, css } from 'twind/style';

const layouts = [
  { title: '4:3', value: 4 / 3 },
  { title: '3:4', value: 3 / 4 },
  { title: '16:9', value: 16 / 9 },
  { title: '9:16', value: 9 / 16 },
];

export const LayoutOptions = () => {
  const [currentAspectRatio, setCurrentAspectRatio] = useState<any>(null);

  useEffect(() => {
    if (currentAspectRatio) {
      const a = () => {
        const parent = document.getElementById('parent') as HTMLDivElement;
        const element = document.getElementById('div') as HTMLDivElement;

        const width = parent.clientWidth;
        const height = parent.clientHeight;

        let elementWidth;
        let elementHeight;

        const diff = 25;

        elementWidth = width - diff;
        elementHeight = (1 / currentAspectRatio) * elementWidth;

        if (elementHeight > height) {
          elementHeight = height - diff;
          elementWidth = currentAspectRatio * elementHeight;
        }

        element.style.width = `${elementWidth}px`;
        element.style.height = `${elementHeight}px`;
      };

      a();

      window.onresize = a;
    }
  }, [currentAspectRatio]);

  return (
    <section
      id="parent"
      className={tw(
        'max-w-[1200px] w-full bg-white flex justify-center items-center gap-6 flex-wrap md:gap-10 bg-opacity-5 border-1 border-white border-opacity-30',
        css({ '&': { height: 'calc(100vh - 100px)' } })
      )}
    >
      {!currentAspectRatio ? (
        <div
          className={tw(
            'flex justify-center items-center gap-6 flex-wrap md:gap-10'
          )}
        >
          {layouts.map(({ title, value }) => (
            <div
              onClick={() => setCurrentAspectRatio(value)}
              className={tw(
                'w-24 h-24 bg-white bg-opacity-20 text-white font-medium hover:bg-opacity-50 cursor-pointer flex justify-center items-center'
              )}
            >
              {title}
            </div>
          ))}
        </div>
      ) : (
        <div className={tw('bg-yellow-400')} id="div"></div>
      )}
    </section>
  );
};
