import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { firestore } from '../configs/firebase.config';
import Chat from './Chat';

const ChatConfig = ({ currentChatSession, currentInitiator }) => {
  const [chatSession, setChatSession] = useState(currentChatSession.data());

  useEffect(() => {
    const notificationsCollection = collection(firestore, 'sessions');
    const listener = onSnapshot(
      doc(notificationsCollection, currentChatSession.id),
      (snapshot) => {
        console.log('called', snapshot);
        setChatSession(snapshot.data());
      }
    );

    return listener;
  }, []);

  const receivers = useMemo(() => {
    let receiver = null;
    if (chatSession) {
      receiver = chatSession.participants.filter(
        (participant) => participant !== currentInitiator
      )[0];
    }

    return receiver;
  }, [chatSession]);

  return (
    <Chat
      messages={chatSession.messages || []}
      onMessageAdded={(message) => {
        const notificationsCollection = collection(firestore, 'sessions');
        updateDoc(doc(notificationsCollection, currentChatSession.id), {
          messages: [...(chatSession.messages ?? []), message],
        });

        // setMessages((prev) => {
        //   return [...prev, message];
        // });
      }}
      currentInitiator={currentInitiator ?? ''}
      receiver={receivers}
    />
  );
};

export default ChatConfig;
