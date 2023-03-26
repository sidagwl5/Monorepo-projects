import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../configs/firebase.config';
import Chat from './Chat';

const ChatConfig = ({ currentChatSession, currentInitiator }) => {
  const [chatSession, setChatSession] = useState(currentChatSession.data());

  useEffect(() => {
    const notificationsCollection = collection(firestore, 'sessions');
    const listener = onSnapshot(
      doc(notificationsCollection, currentChatSession.id),
      (snapshot) => {
        PubSub.publish('onMessage');
        setChatSession(snapshot.data());
      }
    );

    return listener;
  }, [currentChatSession]);

  return (
    <Chat
      messages={chatSession.messages || []}
      onMessageAdded={(message) => {
        const notificationsCollection = collection(firestore, 'sessions');
        updateDoc(doc(notificationsCollection, currentChatSession.id), {
          messages: [...(chatSession.messages ?? []), message],
        });
      }}
      currentInitiator={currentInitiator ?? ''}
    />
  );
};

export default ChatConfig;
