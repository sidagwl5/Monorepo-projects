import { tw } from 'twind';

export const MessageElement = ({ currentInitiator, initiator, title }) => {
  return (
    <div
      className={tw(
        'bg-[#AC8EFF] max-w-[400px] w-max break-words text-white px-4 text-sm py-2 rounded-2xl',
        currentInitiator === initiator
          ? 'self-end! rounded-tr-none!'
          : 'rounded-tl-none!'
      )}
    >
      {title}
    </div>
  );
};