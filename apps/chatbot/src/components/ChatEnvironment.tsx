import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { tw } from 'twind';
import { firestore } from '../configs/firebase.config';
import ChatConfig from './ChatConfig';

export const ChatEnvironment = ({ currentInitiator }) => {
  const [currentChatSession, setCurrentChatSession] = useState<Record<
    string,
    any
  > | null>(null);
  const [chatSessions, setChatSessions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const notificationsCollection = collection(firestore, 'sessions');
      const queryRef = query(
        notificationsCollection,
        where('participants', 'array-contains', currentInitiator.email)
      );
      const docs = await getDocs(queryRef);
      setChatSessions(docs.docs);
    })();
  }, []);

  return currentChatSession ? (
    <ChatConfig
      currentInitiator={currentInitiator?.email}
      currentChatSession={currentChatSession}
    />
  ) : (
    <div className={tw('w-full h-[420px] text-white p-4 flex flex-col gap-3')}>
      <h1 className={tw('text-2xl font-semibold font-nunitoSans')}>
        Chat Sessions
      </h1>
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
  );
};
