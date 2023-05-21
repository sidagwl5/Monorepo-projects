import Image from 'next/image';
import { useState } from 'react';
import { tw } from 'twind';
import { IconButton, addPenSvg, eraserSvg, pointerCircleSvg } from 'ui-lib';
import { DrawSettings } from './DrawSettings';
import { EraserSettings } from './EraserSettings';
import { MoveSettings } from './MoveSettings';

const toolOptions = [
  {
    title: 'Select',
    tooltipProps: {
      title: `Select (S)`,
    },
    icon: pointerCircleSvg,
    key: 'select',
    Component: MoveSettings,
  },
  {
    title: 'Draw',
    tooltipProps: {
      title: `Draw (D)`,
    },
    icon: addPenSvg,
    key: 'draw',
    Component: DrawSettings,
  },
  {
    title: 'Eraser',
    tooltipProps: {
      title: `Eraser (E)`,
    },
    icon: eraserSvg,
    key: 'eraser',
    Component: EraserSettings,
  },
  // {
  //   title: 'Shapes',
  //   tooltipProps: {
  //     title: `Shapes (S)`,
  //   },
  //   icon: shapesSvg,
  //   key: 'shapes',
  // },
];

const ToolOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOption, setCurrentOption] = useState('draw');

  const handleOptionClick = (key, e) => {
    setAnchorEl(e.currentTarget);
    setCurrentOption(key);
  };

  return (
    <div
      className={tw(
        'rounded-lg overflow-hidden absolute left-0 top-[50%] translate-y-[-50%] flex flex-col'
      )}
    >
      {toolOptions.map(({ icon, key, Component, ...rest }) => (
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
            <Image
              className={tw('filter', currentOption === key ? 'invert' : '')}
              src={icon}
              alt={rest.title}
            />
          </IconButton>
          {currentOption === key && Component && (
            <Component anchorEl={anchorEl} />
          )}
        </>
      ))}
    </div>
  );
};

export default ToolOptions;
