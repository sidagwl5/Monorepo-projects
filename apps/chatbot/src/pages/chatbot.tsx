/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useState } from 'react';
import { tw } from 'twind/style';
import crossSvg from '../assets/svgs/cross.svg';
import messageSvg from '../assets/svgs/message.svg';
import Chat from '../components/Chat';

export function Chatbot() {
  const currentInitiator = useRef(crypto.randomUUID());
  const botQuestions = useRef({
    1: {
      initiator: 'bot',
      id: 1,
      title: 'Hi sir, how are you?',
    },
    2: {
      initiator: 'bot',
      id: 2,
      title: 'Nice!, What can I help you with?',
    },
    3: {
      initiator: 'bot',
      id: 3,
      title: 'You can ask this from our customer service',
    },
    4: {
      initiator: 'bot',
      id: 4,
      title: 'Anything else sir?',
    },
    5: {
      initiator: 'bot',
      id: 5,
      title: 'Thank you',
    },
  });

  const [messages, setMessages] = useState([botQuestions.current[1]]);
  const [open, setOpen] = useState(false);

  return (
    <div className={tw('fixed bottom-3 right-3 flex flex-col items-end')}>
      <div
        className={tw(
          'w-[300px] transition-all duration-300 opacity-0 relative top-[480px]',
          open && 'top-[-8px] opacity-100'
        )}
      >
        <Chat
          messages={messages}
          onMessageAdded={(message) => {
            setMessages((prev) => {
              return [...prev, message];
            });
          }}
          currentInitiator={currentInitiator}
        />
      </div>
      <div
        onClick={setOpen.bind(this, !open)}
        className={tw(
          'w-[50px] p-3 cursor-pointer flex justify-center items-center h-[50px] relative rounded-full bg-blue-400'
        )}
      >
        {open ? (
          <img src={crossSvg} alt="message-icon" loading="lazy" />
        ) : (
          <img src={messageSvg} alt="message-icon" loading="lazy" />
        )}
      </div>
    </div>
  );
}
