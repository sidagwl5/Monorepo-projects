/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jsCookie from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind/style';
import crossSvg from '../assets/svgs/cross.svg';
import messageSvg from '../assets/svgs/message.svg';
import { ChatEnvironment } from '../components/ChatEnvironment';
import FillForm from '../components/FillForm';
import 'pubsub-js';

export const Chatbot = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [currentInitiator, setCurrentInitiator] = useState(
    JSON.parse(jsCookie.get('initiator') ?? 'null')
  );

  useEffect(() => {
    const onMessage = PubSub.subscribe('onMessage', () => {
      if (badgeRef.current && !open) badgeRef.current.style.display = 'block';
    });

    return () => {
      PubSub.unsubscribe(onMessage);
    };
  }, [open]);

  return (
    <div className={tw('fixed bottom-3 right-3 flex flex-col items-end')}>
      <div
        className={tw(
          'w-[300px] transition-all h-[420px] bg-rootContainerClr right-1 rounded-md duration-300 opacity-0 relative top-[480px]',
          open && 'top-[-8px] opacity-100'
        )}
      >
        {currentInitiator ? (
          <ChatEnvironment currentInitiator={currentInitiator} />
        ) : (
          <FillForm handleSubmitForm={setCurrentInitiator} />
        )}
      </div>
      <div
        onClick={() => {
          if (badgeRef.current) badgeRef.current.style.display = 'none';
          setOpen(!open);
        }}
        className={tw(
          'w-[50px] p-3 cursor-pointer flex justify-center items-center h-[50px] relative rounded-full bg-blue-400'
        )}
      >
        <div className={tw('relative')}>
          <div
            ref={badgeRef}
            className={tw(
              'w-2 h-2 absolute hidden top-0 right-0 rounded-full bg-blue-600'
            )}
          />
          {open ? (
            <img src={crossSvg} alt="message-icon" loading="lazy" />
          ) : (
            <img src={messageSvg} alt="message-icon" loading="lazy" />
          )}
        </div>
      </div>
    </div>
  );
};
