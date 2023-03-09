import Chat from 'apps/chatbot/src/components/Chat';
import ChatConfig from 'apps/chatbot/src/components/ChatConfig';
import { firestore } from 'apps/chatbot/src/configs/firebase.config';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { useRef, useState, useEffect } from 'react';
import { tw } from 'twind';

const ContentRenderer = () => {
  const [currentChatSession, setCurrentChatSession] = useState<Record<
    string,
    any
  > | null>(null);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const currentInitiator = useRef('fa61be64-c87a-4348-b7e4-b837ad761b16');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const notificationsCollection = collection(firestore, 'sessions');
      const queryRef = query(
        notificationsCollection,
        where('participants', 'array-contains', currentInitiator.current)
      );
      const docs = await getDocs(queryRef);
      setChatSessions(docs.docs);
    })();
  }, []);

  console.log({ chatSessions });

  return (
    <div className={tw('flex-1 gap-6 flex')}>
      <div className={tw('w-[250px] text-white')}>
        {chatSessions.map((chatSession) => {
          const session = chatSession.data();

          return (
            <div
              onClick={setCurrentChatSession.bind(this, chatSession)}
              className={tw(
                'w-full py-3 rounded-md text-sm px-3 bg-white bg-opacity-10 cursor-pointer'
              )}
            >
              <p className={tw('opacity-80')}>
                {session.messages?.length
                  ? session.messages[0]?.title
                  : 'Currently no message!'}
              </p>
            </div>
          );
        })}
      </div>

      <div className={tw('flex-1 min-w-0')}>
        {currentChatSession ? (
          <ChatConfig
            currentInitiator={currentInitiator.current}
            currentChatSession={currentChatSession}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ContentRenderer;
