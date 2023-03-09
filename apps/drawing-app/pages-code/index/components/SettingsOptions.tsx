import { Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { css, tw } from 'twind/style';
import { IconButton, settingsSvg } from 'ui-lib';
import CloseIcon from '@mui/icons-material/Close';

const settingsOptions = [
  {
    title: 'Settings',
    icon: settingsSvg,
    key: 'settings',
    tooltipProps: {
      title: 'Settings',
    },
  },
];

const SettingsOptions = () => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (key, e) => {
    setOpen(true);
  };

  return (
    <div className={tw('rounded-lg overflow-hidden flex flex-col')}>
      {settingsOptions.map(({ icon, key, component, ...rest }) => (
        <>
          <IconButton key={key} onClick={handleOptionClick} {...rest}>
            <Image src={icon} alt={rest.title} />
          </IconButton>
          <Dialog
            onClose={setOpen.bind(this, false)}
            open={open}
            hideBackdrop
            classes={{
              container: tw(
                'justify-start',
                css({
                  background: 'rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(10px)',
                })
              ),

              paper: tw(
                'm-0 h-full rounded-none text-white max-h-full bg-[#484344] w-[450px] p-8'
              ),
            }}
          >
            <DialogContent className={tw('p-0')}>
              <div className={tw('flex w-full items-center justify-between')}>
                <h1
                  className={tw(
                    'text-2xl pl-3 pb-[2px] flex font-nunitoSans items-center md:text-3xl font-semibold border-l-[6px] border-[#AC8EFF]'
                  )}
                >
                  Settings
                </h1>

                <CloseIcon
                  className={tw('opacity-80 cursor-pointer')}
                  onClick={setOpen.bind(this, false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      ))}
    </div>
  );
};

export default SettingsOptions;
