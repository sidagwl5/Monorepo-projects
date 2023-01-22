import { ReactNode } from 'react';
import { css, tw } from 'twind/style';

export const DefaultLayout = ({
  left,
  right,
  content,
}: {
  left: ReactNode;
  right: ReactNode;
  content: ReactNode;
}) => {
  return (
    <section
      className={tw(
        'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
      )}
    >
      <div
        className={tw(
          'h-full max-w-[250px] w-full p-4 flex flex-col gap-6',
          css({ background: 'rgba(255, 255, 255, 0.15)' })
        )}
      >
        {left}
      </div>

      <div
        className={tw(
          'h-full flex-1 flex justify-center items-center',
          css({ background: '#ffffff1a' })
        )}
      >
        {content}
      </div>
      <div
        className={tw(
          'h-full max-w-[100px] p-2 flex flex-col gap-2',
          css({ background: 'rgba(255, 255, 255, 0.15)' })
        )}
      >
        {right}
      </div>
    </section>
  );
};
