import Image from 'next/image';
import { useState } from 'react';
import { tw } from 'twind';
import {
  IconButton,
  addPenSvg,
  eraserSvg,
  pointerCircleSvg,
  shapesSvg,
} from 'ui-lib';
import { MoveSettings } from './MoveSettings';

const toolOptions = [
  {
    title: 'Select',
    tooltipProps: {
      title: `Select (S)`,
    },
    icon: pointerCircleSvg,
    key: 'select',
    component: <MoveSettings />,
  },
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
  const [currentOption, setCurrentOption] = useState('select');

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {toolOptions.map(({ icon, key, component, ...rest }) => (
        <>
          <IconButton
            key={key}
            active={currentOption === key}
            onClick={setCurrentOption.bind(this, key)}
            {...rest}
          >
            <Image src={icon} alt={rest.title} />
          </IconButton>
          {currentOption === key && component}
        </>
      ))}
    </div>
  );
};

export default ToolOptions;
