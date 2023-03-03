import { useState, useEffect } from 'react';
import { tw } from 'twind';

export function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('chatbot useefect', window.origin);
    window.addEventListener('message', (message) => {
      console.log(message.data, 'chatbot');
    });

    // setTimeout(
    //   () => window.top.postMessage('kuch nhi yaar', 'http://localhost:5000'),
    //   3000
    // );
    const channel = new BroadcastChannel('my-channel');
    channel.postMessage("Hey, how's it going mate? I'm from a different tab!");

    channel.onmessage = (e) => {
      console.log(e.data);
    };
  }, []);

  return (
    <>
      <button
        className={tw('text-black')}
        onClick={() => {
          window.open('http://localhost:5000', '_target');
        }}
      >
        Click
      </button>
      <div className={tw('fixed bottom-3 right-3 flex flex-col items-end')}>
        <div
          className={tw(
            'w-[300px] bg-yellow-400 h-[400px] transition-all opacity-0 relative top-[480px]',
            open && 'top-[-8px] opacity-100'
          )}
        ></div>
        <div
          onClick={setOpen.bind(this, !open)}
          className={tw(
            'w-[60px] cursor-pointer h-[60px] rounded-full bg-blue-400'
          )}
        />
      </div>
    </>
  );
}

export default App;
