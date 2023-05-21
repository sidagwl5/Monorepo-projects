import ChatConfig from 'apps/chatbot/src/components/ChatConfig';
import { firestore } from 'apps/chatbot/src/configs/firebase.config';
import { useMeQuery } from 'apps/chatbot/src/queries/user.query';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind';

const Messages = () => {
  const { me } = useMeQuery();
  const [currentChatSession, setCurrentChatSession] = useState<Record<
    string,
    any
  > | null>(null);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const currentInitiator = useRef(me.email);

  useEffect(() => {
    (async () => {
      const notificationsCollection = collection(firestore, 'sessions');

      onSnapshot(notificationsCollection, (snapshot) => {
        setChatSessions(snapshot.docs);
      });
    })();
  }, []);

  return (
    <div className={tw('flex-1 gap-3 flex')}>
      <div className={tw('w-[250px] text-white flex flex-col gap-2')}>
        {chatSessions.map((chatSession) => {
          const session = chatSession.data();

          return (
            <div
              onClick={setCurrentChatSession.bind(this, chatSession)}
              className={tw(
                'w-full py-3 font-nunitoSans rounded-md border-gray-700 border text-sm px-3 bg-white bg-opacity-5 cursor-pointer',
                chatSession.id === currentChatSession?.id && 'bg-opacity-20!'
              )}
            >
              <h3 className={tw('font-semibold text-base capitalize')}>
                {session.name}
              </h3>
              <p className={tw('opacity-70 text-xs')}>
                {session.messages?.length
                  ? session.messages[session.messages.length - 1]?.title
                  : 'No messages'}
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
        ) : (
          <div
            className={tw(
              'w-full h-full border bg-[#3A3335] border-gray-700 rounded-lg flex font-nunitoSans text-white justify-center items-center'
            )}
          >
            <p className={tw('opacity-80')}>No active chat section</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
