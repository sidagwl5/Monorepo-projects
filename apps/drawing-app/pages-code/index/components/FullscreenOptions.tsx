import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useEffect, useRef, useState } from 'react';
import { tw } from 'twind/style';
import { IconButton } from 'ui-lib';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useFullscreen, useToggle } from 'react-use';
import { enqueueSnackbar } from 'notistack';

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
      className={tw('rounded-lg overflow-hidden text-white flex flex-col')}
    >
      <IconButton
        tooltipProps={{
          title: open ? 'Exit fullscreen mode' : 'Enter fullscreen mode',
        }}
        onClick={handleOptionClick}
      >
        {open ? (
          <FullscreenExitIcon className={tw('text-white text-[28px]')} />
        ) : (
          <FullscreenIcon className={tw('text-white text-[28px]')} />
        )}
      </IconButton>
    </div>
  );
};
