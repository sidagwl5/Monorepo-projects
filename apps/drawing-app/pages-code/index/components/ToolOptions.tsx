import Image from 'next/image';
import { useRef, useState } from 'react';
import { tw } from 'twind';
import {
  IconButton,
  addPenSvg,
  eraserSvg,
  pointerCircleSvg,
  shapesSvg,
} from 'ui-lib';
import { MoveSettings } from './MoveSettings';
import { Popover, Popper } from '@mui/material';
import { DrawSettings } from './DrawSettings';

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
    component: <DrawSettings />,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOption, setCurrentOption] = useState('select');

  console.log(anchorEl);

  const handleOptionClick = (key, e) => {
    setAnchorEl(e.currentTarget);
    setCurrentOption(key);
  };

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {toolOptions.map(({ icon, key, component, ...rest }) => (
        <>
          <IconButton
            key={key}
            active={currentOption === key}
            onClick={
              currentOption === key && anchorEl
                ? setAnchorEl.bind(this, null)
                : handleOptionClick.bind(this, key)
            }
            {...rest}
          >
            <Image src={icon} alt={rest.title} />
          </IconButton>
          {currentOption === key && (
            <Popper
              placement="left-start"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              className={tw(
                '!ml-4 p-3 rounded-lg overflow-hidden  bg-[#574D51] border border-[#695F63]'
              )}
            >
              <div className={tw('w-50 text-sm font-semibold font-nunitoSans')}>
                {component}
              </div>
            </Popper>
          )}
        </>
      ))}
    </div>
  );
};

export default ToolOptions;
