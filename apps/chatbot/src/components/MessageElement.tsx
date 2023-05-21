import dayjs from 'dayjs';
import { tw } from 'twind';

export const MessageElement = ({
  currentInitiator,
  initiator,
  title,
  time,
}) => {
  return (
    <div
      className={tw(
        'flex gap-2 font-nunitoSans',
        currentInitiator === initiator ? 'self-end! flex-row-reverse' : null
      )}
    >
      <div
        className={tw(
          'bg-[#AC8EFF] max-w-[400px] w-max break-words text-white px-4 text-sm py-2 rounded-2xl',
          currentInitiator === initiator
            ? 'self-end! rounded-tr-none! pr-3!'
            : 'rounded-tl-none! pl-3!'
        )}
      >
        {title}
      </div>
      <p className={tw('text-white opacity-70 text-[9px] relative top-2')}>
        {dayjs(time).format('HH:mm A')}
      </p>
    </div>
  );
};
