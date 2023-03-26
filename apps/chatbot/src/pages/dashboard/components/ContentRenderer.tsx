import ChatConfig from 'apps/chatbot/src/components/ChatConfig';
import { firestore } from 'apps/chatbot/src/configs/firebase.config';
import { useMeQuery } from 'apps/chatbot/src/queries/user.query';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind';

const ContentRenderer = () => {
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
    <div className={tw('flex-1 gap-6 flex')}>
      <div className={tw('w-[250px] text-white flex flex-col gap-3')}>
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
