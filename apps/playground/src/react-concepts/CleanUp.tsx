import React, { useEffect, useState } from 'react';
import { tw } from 'twind/style';

const Child = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log('useEffect mount');

    return () => {
      console.log('cleanup called mount!');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect updated');

    return () => {
      console.log('cleanup called updated!');
    };
  }, [number]);

  console.log('rendering');

  return (
    <div>
      <button onClick={setNumber.bind(this, number + 1)}>Increment</button>
    </div>
  );
};

const CleanUp = () => {
  const [hide, setHide] = useState(false);

  return (
    <div
      className={tw(
        'w-full h-screen flex justify-center items-center text-white flex flex-col gap-4 bg-black'
      )}
    >
      <button onClick={setHide.bind(this, !hide)}>Hide child</button>
      {!hide && <Child />}
    </div>
  );
};

export default CleanUp;
