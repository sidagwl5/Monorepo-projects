import { memo, useEffect, useState } from 'react';
import { tw } from 'twind';

const ListItem = memo(({ title }) => {
  console.log({ title });

  useEffect(() => {
    return () => {
      console.log(title, 'unmounted');
    };
  }, []);

  return <div>{title}</div>;
});

const DynamicListWithKeyIndex = () => {
  const [array, setArray] = useState([1, 2, 3]);

  return (
    <div className={tw('text-white')}>
      {array.map((v, idx) => (
        <ListItem key={idx} title={v} />
      ))}
      <button
        onClick={() => {
          array.push(array.length);
          setArray(array);
        }}
      >
        Update list
      </button>
    </div>
  );
};

export default DynamicListWithKeyIndex;
