import { tw, css } from 'twind/style';
import { Button } from 'ui-lib';
import { useForm, Controller } from 'react-hook-form';
import jsCookie from 'js-cookie';
import { firestore } from '../configs/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

const FillForm = ({ handleSubmitForm }: any) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: { name: '', email: '' },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const usersCollection = collection(firestore, 'users');
      const userDoc = doc(usersCollection, data.email);

      await setDoc(userDoc, data);
      jsCookie.set('initiator', JSON.stringify(data));

      const notificationsCollection = collection(firestore, 'notifications');
      const notificationDoc = doc(notificationsCollection, userDoc.id);

      const sessionsCollection = collection(firestore, 'sessions');
      await setDoc(doc(sessionsCollection), {
        participants: [data.email],
        name: data.name,
      });

      setDoc(notificationDoc, {
        message: `${data.name} has subscribed to chat!`,
        variant: 'info',
        read: false,
      });
      handleSubmitForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={tw(
        'w-[80%] h-[400px] font-nunitoSans mx-auto text-white flex flex-col justify-center gap-7'
      )}
    >
      <h1 className={tw('text-3xl self-center -mt-12 mb-4 font-semibold')}>
        Form
      </h1>

      <Controller
        control={control}
        name="name"
        rules={{
          required: { message: 'Required!', value: true },
        }}
        render={({ field }) => (
          <input
            className={tw(
              'h-[35px] p-3 text-white rounded-md bg-white bg-opacity-10',
              css({
                '&:focus-visible': {
                  outline: '2px rgba(255, 255, 255, 0.5) solid',
                },
              })
            )}
            placeholder="Enter name"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: { message: 'Required!', value: true },
        }}
        render={({ field }) => (
          <input
            className={tw(
              'h-[35px] p-3 text-white rounded-md bg-white bg-opacity-10',
              css({
                '&:focus-visible': {
                  outline: '2px rgba(255, 255, 255, 0.5) solid',
                },
              })
            )}
            placeholder="Enter email"
            {...field}
          />
        )}
      />

      <Button loading={loading} className="self-center">
        Submit
      </Button>
    </form>
  );
};

export default FillForm;
