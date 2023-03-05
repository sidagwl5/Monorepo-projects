import Chat from 'apps/chatbot/src/components/Chat';
import { useRef, useState } from 'react';
import { tw } from 'twind';

const ContentRenderer = () => {
  const currentInitiator = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState([]);

  return (
    <div className={tw('flex-1')}>
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
  );
};

export default ContentRenderer;
