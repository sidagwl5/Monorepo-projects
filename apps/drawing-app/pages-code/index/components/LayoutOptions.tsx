import Image from 'next/image';
import { css, tw } from 'twind/style';
import { Button, tickcircleSvg } from 'ui-lib';
import { layouts } from '../staticData';

const LayoutOptions = ({ handleAspectRatio }) => {
  const [currentAspectRatio, setCurrentAspectRatio] = handleAspectRatio;
  return (
    <div
      className={tw(
        'flex h-full max-w-[800px] px-4 w-full flex-col gap-12 sm:gap-16 items-center sm:items-start justify-center text-white'
      )}
    >
      <h1
        className={tw(
          'text-2xl md:text-4xl sm:mb-6 font-semibold border-l-8 pl-4 border-[#AC8EFF]'
        )}
      >
        Choose Layout:
      </h1>

      <div
        className={tw(
          'flex justify-center sm:justify-between w-full gap-6 sm:gap-8 items-center flex-wrap md:gap-10'
        )}
      >
        {layouts.map(({ value }) => (
          <div
            key={value}
            onClick={setCurrentAspectRatio.bind(this, value)}
            className={tw(
              'w-28 sm:w-32 bg-[#494345] rounded-md relative items-center font-medium cursor-pointer flex justify-center items-center',
              currentAspectRatio === value
                ? 'bg-[#716A6C]'
                : 'hover:border hover:border-[#716A6C]',
              css({ aspectRatio: value })
            )}
          >
            <Image
              className={tw(
                'absolute top-2 right-2 hidden',
                currentAspectRatio === value && 'block'
              )}
              alt="tick circle"
              width={32}
              src={tickcircleSvg}
            />
          </div>
        ))}
      </div>

      <Button className="self-center">Proceed</Button>
    </div>
  );
};

export default LayoutOptions;
