/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useRef, useEffect } from 'react';
import { tw, css } from 'twind/style';
import messageSvg from '../assets/svgs/message.svg';
import crossSvg from '../assets/svgs/cross.svg';
import dayjs from 'dayjs';
import { MessageElement } from '../components/MessageElement';

export function Chatbot() {
  const scrollDecoyRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    scrollDecoyRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className={tw('fixed bottom-3 right-3 flex flex-col items-end')}>
      <div
        className={tw(
          'w-[300px] bg-[#3A3335] flex gap-3 mr-2 flex-col p-3 border relative border-gray-500 rounded-md h-[400px] transition-all duration-300 opacity-0 relative top-[480px]',
          open && 'top-[-8px] opacity-100'
        )}
      >
        <div
          className={tw(
            'flex flex-col gap-4 px-3 pl-0 overflow-auto min-h-0 flex-1'
          )}
        >
          {messages.map((message) => (
            <MessageElement
              {...message}
              currentInitiator={currentInitiator.current}
            />
          ))}

          <div ref={scrollDecoyRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const inputElement = document.getElementById(
              'input'
            ) as HTMLInputElement;
            const value = inputElement.value.trim();

            if (value) {
              setMessages((prev) => {
                return [
                  ...prev,
                  {
                    id: prev.length,
                    title: value,
                    initiator: currentInitiator.current,
                    time: dayjs().toISOString(),
                  },
                  {
                    id: prev.length + 1,
                    title: 'Bot typing',
                    initiator: 'bot',
                    time: dayjs().toISOString(),
                    status: 'pending',
                    duration: 1000,
                  },
                ];
              });

              // setTimeout(() => {
              //   setMessages((prev) => {
              //     botTypingRef.current = false;
              //     const lastBotQuestion = [...prev]
              //       .reverse()
              //       .find((message) => message.initiator === 'bot');

              //     if (
              //       lastBotQuestion &&
              //       botQuestions.current[lastBotQuestion.id + 1]
              //     ) {
              //       return [
              //         ...prev,
              //         {
              //           ...botQuestions.current[lastBotQuestion.id + 1],
              //           time: dayjs().toISOString(),
              //         },
              //       ];
              //     }

              //     return prev;
              //   });
              // }, 2000);

              inputElement.value = '';
            }
          }}
        >
          <input
            id="input"
            type="text"
            placeholder="Enter your message"
            className={tw(
              'w-full bg-[#494345] rounded-full placeholder::text-gray-400 border-none py-2 text-sm px-4 text-white',
              css({
                '&:focus-visible': {
                  outline: '2px rgba(255, 255, 255, 0.5) solid',
                },
              })
            )}
          />
        </form>
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
