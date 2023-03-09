import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind/style';
import { IconButton, exitFullScreenSvg } from 'ui-lib';

export const FullScreenOptions = () => {
  const [open, setOpen] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    document.addEventListener('fullscreenchange', (e) => {
      setOpen(Boolean(document.fullscreenElement));
    });
    document.addEventListener('fullscreenerror', (e) => {
      enqueueSnackbar({
        message: 'Error while going fullscreen mode',
        variant: 'error',
      });
    });
  }, []);

  function handleOptionClick() {
    if (!open) document.body.requestFullscreen();
    else document.exitFullscreen();
  }

  return (
    <div
      ref={divRef}
      className={tw(
        'rounded-lg absolute bottom-0 left-0 overflow-hidden text-white flex flex-col'
      )}
    >
      <IconButton
        tooltipProps={{
          title: open ? 'Exit fullscreen mode' : 'Enter fullscreen mode',
        }}
        onClick={handleOptionClick}
      >
        {open ? (
          <Image
            src={exitFullScreenSvg}
            width={20}
            alt="exit fullscreen mode"
          />
        ) : (
          <FullscreenIcon className={tw('text-white text-[28px]')} />
        )}
      </IconButton>
    </div>
  );
};
