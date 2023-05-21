import { Dialog, DialogContent, Switch } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { css, tw } from 'twind/style';
import { IconButton, settingsSvg } from 'ui-lib';
import CloseIcon from '@mui/icons-material/Close';
import { useDrawingContext } from '../Context';

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
  const {
    handleSettings: [settings, setSettings],
  } = useDrawingContext();
  const [open, setOpen] = useState(false);

  const handleOptionClick = () => {
    setOpen(true);
  };

  return (
    <div
      className={tw(
        'rounded-lg overflow-hidden absolute top-0 left-0 flex flex-col'
      )}
    >
      {settingsOptions.map(({ icon, key, ...rest }) => (
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
                  background: 'rgba(0, 0, 0, 0.35)',
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

              <div
                className={tw(
                  'w-full flex flex-col mt-10 text-lg pl-3 pr-1 gap-3'
                )}
              >
                <div className={tw('justify-between flex items-center')}>
                  <p>Auto Save</p>
                  <Switch
                    checked={settings.autoSave}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoSave: e.target.checked,
                      }))
                    }
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ))}
    </div>
  );
};

export default SettingsOptions;
