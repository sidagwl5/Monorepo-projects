import { Canvas } from 'apps/drawing-app/classes/canvas.class';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { tw } from 'twind';
import { IconButton, downloadSvg, resetSvg, saveSvg } from 'ui-lib';
import { useSnackbar } from 'notistack';

const UtilityOptions = () => {
  const { enqueueSnackbar } = useSnackbar();
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
      title: 'Reset Canvas',
      tooltipProps: {
        title: `Reset Canvas (R)`,
      },
      icon: resetSvg,
      key: 'reset',
      className: 'bg-dangerBg!',
      onClick: () => {
        Canvas.clearCanvas();
        Canvas.storeImageData();

        enqueueSnackbar({
          variant: 'success',
          message: 'Canvas reset successful',
        });
      },
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
          message: 'Canvas progress saved',
        });
      },
    },
  ]);

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {utilityOptions.current.map(({ icon, key, ...rest }) => (
        <IconButton key={key} {...rest}>
          <Image src={icon} alt={rest.title} />
        </IconButton>
      ))}
    </div>
  );
};

export default UtilityOptions;
