import { tw, css } from 'twind/style';
import { MessageElement } from './MessageElement';
import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const Chat = ({
  messages,
  currentInitiator,
  classes,
  onMessageAdded,
  receiver,
}) => {
  const scrollDecoyRef = useRef<HTMLDivElement>(null);
  const { root } = classes || {};

  useEffect(() => {
    scrollDecoyRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div
      className={tw(
        'w-full bg-[#3A3335] flex gap-3 mr-2 flex-col p-3 border relative border-gray-500 rounded-md h-full relative',
        root
      )}
    >
      <div
        className={tw(
          'flex flex-col gap-4 px-3 pl-0 overflow-auto min-h-0 min-w-0 flex-1'
        )}
      >
        {messages.map((message) => (
          <MessageElement {...message} currentInitiator={currentInitiator} />
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
            onMessageAdded({
              id: crypto.randomUUID(),
              title: value,
              initiator: currentInitiator,
              receiver,
              time: dayjs().toISOString(),
            });

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
  );
};

export default Chat;
