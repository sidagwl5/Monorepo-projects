import { Canvas } from 'apps/drawing-app/classes/canvas.class';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { tw } from 'twind';
import { IconButton, downloadSvg, saveSvg } from 'ui-lib';
import { useSnackbar } from 'notistack';

const UtilityOptions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentOption, setCurrentOption] = useState('draw');
  const utilityOptions = useRef<any[]>([
    {
      title: 'Download',
      tooltipProps: {
        title: `Download (D)`,
      },
      icon: downloadSvg,
      key: 'download',
    },
    {
      title: 'Save',
      tooltipProps: {
        title: `Save (D)`,
      },
      icon: saveSvg,
      key: 'save',
      onClick: () => {
        localStorage.setItem(
          'progress',
          Canvas.getElements().canvas.toDataURL('image/png', 1)
        );

        enqueueSnackbar({
          variant: 'success',
          message: 'Canvas reset successful',
        });
      },
    },
  ]);

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {utilityOptions.current.map(({ icon, key, ...rest }) => (
        <IconButton key={key} active={currentOption === key} {...rest}>
          <Image src={icon} alt={rest.title} />
        </IconButton>
      ))}
    </div>
  );
};

export default UtilityOptions;
