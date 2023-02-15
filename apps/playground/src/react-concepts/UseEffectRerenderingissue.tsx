import React, { useEffect, useMemo, useState } from 'react';
import { tw } from 'twind';

const UseEffectRerenderingissue = async () => {
  const [number, setNumber] = useState(0);

  useEffect(async () => {
    console.log('before');
  }, []);

  const multipleOfTwo = await useMemo(async () => {
    let num = number;

    console.log('use memo');
    // await fetch('https://jsonplaceholder.typicode.com/todos/1');

    Array(1000000)
      .fill(undefined)
      .forEach((v, idx) => (num = num + idx));

    return num;
  }, [number]);

  console.log('re-render', multipleOfTwo);

  return (
    <div
      onClick={() =>
        setNumber((prev) => {
          const newVal = prev + 1;
          return newVal;
        })
      }
      className={tw('text-white')}
    >
      {multipleOfTwo}
    </div>
  );
};

export default UseEffectRerenderingissue;
