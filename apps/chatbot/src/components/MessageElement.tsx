import { useEffect, useState } from 'react';
import { tw } from 'twind';

export const MessageElement = ({
  currentInitiator,
  sender,
  title,
  duration,
}) => {
  const [showMsg, setShowMsg] = useState(!duration);

  useEffect(() => {
    setTimeout(setShowMsg.bind(this, true), duration);
  }, []);

  return (
    showMsg && (
      <div
        className={tw(
          'bg-[#AC8EFF] w-[60%] break-words text-white px-4 text-sm py-2 rounded-2xl',
          currentInitiator === sender
            ? 'self-end! rounded-tr-none!'
            : 'rounded-tl-none!'
        )}
      >
        {title}
      </div>
    )
  );
};
