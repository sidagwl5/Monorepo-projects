import React, { memo, useEffect, useState } from 'react';
import { tw } from 'twind';

const ChildComponent = () => {
  console.log('child rendering');
  return <p className={tw('text-white')}>Child</p>;
};

export const RerenderingNotEqualToDomUpdation = () => {
  const [timer, setTimer] = useState({ timer: 0 });

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setTimer((prev) => {
          return { ...prev };
        }),
      1000
    );

    return () => clearTimeout(timeout);
  }, [timer]);

  console.log('parent rendering');

  return (
    <>
      <ChildComponent />
      <p className={tw('text-white')}>{crypto.randomUUID()}</p>
    </>
  );
};
