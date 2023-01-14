import React from 'react';
import { tw } from 'twind';

export const Slidebar = ({ setValue, ...rest }: any) => {
  return (
    <input
      className={tw('w-full')}
      type="range"
      onChange={(e) => {
        setValue(Number(e.target.value));
      }}
      {...rest}
    />
  );
};
