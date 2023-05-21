import { Canvas } from 'apps/drawing-app/classes/canvas.class';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind';
import { IconButton, downloadSvg, resetSvg, saveSvg } from 'ui-lib';
import { useSnackbar } from 'notistack';
import ExportDialog from './ExportDialog';
import { useDrawingContext } from '../Context';

const UtilityOptions = () => {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const utilityOptions = useRef<any[]>([
    {
      title: 'Download',
      tooltipProps: {
        title: `Download (D)`,
      },
      icon: downloadSvg,
      key: 'download',
      onClick: () => {
        setIsExportDialogOpen(true);
      },
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

  const {
    handleSettings: [settings],
  } = useDrawingContext();

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (settings.autoSave)
      interval = setInterval(utilityOptions.current[2].onClick, 60000 * 2);

    return () => {
      clearInterval(interval);
    };
  }, [settings.autoSave]);

  return (
    <>
      <div
        className={tw(
          'rounded-lg absolute right-0 top-[50%] translate-y-[-50%] overflow-hidden flex flex-col'
        )}
      >
        {utilityOptions.current.map(({ icon, key, ...rest }) => (
          <IconButton key={key} {...rest}>
            <Image src={icon} alt={rest.title} />
          </IconButton>
        ))}
      </div>
      {isExportDialogOpen && (
        <ExportDialog setIsExportDialogOpen={setIsExportDialogOpen} />
      )}
    </>
  );
};

export default UtilityOptions;
