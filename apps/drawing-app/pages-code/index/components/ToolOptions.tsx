import Image from 'next/image';
import { useState } from 'react';
import { tw } from 'twind';
import { IconButton, addPenSvg, eraserSvg, shapesSvg } from 'ui-lib';

const toolOptions = [
  {
    title: 'Eraser',
    tooltipProps: {
      title: `Eraser (E)`,
    },
    icon: eraserSvg,
    key: 'eraser',
  },
  {
    title: 'Draw',
    tooltipProps: {
      title: `Draw (D)`,
    },
    icon: addPenSvg,
    key: 'draw',
  },
  {
    title: 'Shapes',
    tooltipProps: {
      title: `Shapes (S)`,
    },
    icon: shapesSvg,
    key: 'shapes',
  },
];

const ToolOptions = () => {
  const [currentOption, setCurrentOption] = useState('draw');

  return (
    <div className={tw('h-full flex items-center')}>
      <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
        {toolOptions.map(({ icon, key, ...rest }) => (
          <IconButton
            key={key}
            active={currentOption === key}
            onClick={setCurrentOption.bind(this, key)}
            {...rest}
          >
            <Image src={icon} alt={rest.title} />
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default ToolOptions;
