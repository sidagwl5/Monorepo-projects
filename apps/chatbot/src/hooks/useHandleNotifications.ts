import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { firestore } from '../configs/firebase.config';
import { enqueueSnackbar } from 'notistack';

const useHandleNotifications = () => {
  useEffect(() => {
    const notificationsCollection = collection(firestore, 'notifications');

    onSnapshot(notificationsCollection, (querySnapshot) => {
      querySnapshot.docChanges().forEach((document) => {
        if (document.type === 'added' && !document.doc.data().read) {
          const docRef = doc(notificationsCollection, document.doc.id);
          enqueueSnackbar(document.doc.data());
          updateDoc(docRef, { read: true });
        }
      });
    });
  }, []);

  return null;
};

export default useHandleNotifications;
