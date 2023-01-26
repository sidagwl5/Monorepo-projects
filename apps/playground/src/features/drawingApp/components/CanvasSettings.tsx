import { Tooltip } from '@mui/material';
import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';
import DoneIcon from '@mui/icons-material/Done';

export const CanvasSettings = () => {
  const { canvasSettings, setCanvasSettings } = useDrawingContext();

  return (
    <div className={tw('text-white flex flex-col gap-1')}>
      <p className={tw('font-medium text-sm capitalize')}>Bg Color</p>
      <div className={tw('w-full flex gap-2')}>
        {[
          { title: 'green', value: 'green' },
          { title: 'blue', value: 'blue' },
          { title: 'red', value: 'red' },
          { title: 'pink', value: 'pink' },
          { title: 'yellow', value: 'yellow' },
          { title: 'hazelnut', value: 'rgba(255, 255, 255, 0.08)' },
        ].map(({ title, value }) => (
          <Tooltip arrow title={title} disableInteractive placement="top">
            <div className={tw('relative cursor-pointer')}>
              {value === canvasSettings.bg_color && (
                <div
                  onClick={() => {
                    setCanvasSettings((prev: any) => ({
                      ...prev,
                      bg_color,
                    }));
                  }}
                  className={tw(
                    'w-6 h-6 rounded-full flex items-center justify-center absolute top-0 left-0',
                    css({ background: 'rgba(0, 0, 0, 0.2)' })
                  )}
                >
                  <DoneIcon className={tw('text-white text-[16px]!')} />
                </div>
              )}
              <div
                onClick={() => {
                  setCanvasSettings((prev: any) => ({
                    ...prev,
                    bg_color: value,
                  }));
                }}
                className={tw(
                  'w-6 h-6 rounded-full',
                  title === 'hazelnut'
                    ? css({ background: value })
                    : `bg-${value}-400`
                )}
              />
            </div>
          </Tooltip>
        ))}

        <Tooltip arrow title={'white'} disableInteractive placement="top">
          <div className={tw('relative cursor-pointer')}>
            {'white' === canvasSettings.bg_color && (
              <div
                onClick={() => {
                  setCanvasSettings((prev: any) => ({
                    ...prev,
                    bg_color: 'white',
                  }));
                }}
                className={tw(
                  'w-6 h-6 rounded-full flex items-center justify-center absolute top-0 left-0',
                  css({ background: 'rgba(0, 0, 0, 0.2)' })
                )}
              >
                <DoneIcon className={tw('text-white text-[16px]!')} />
              </div>
            )}
            <div
              onClick={() => {
                setCanvasSettings((prev: any) => ({
                  ...prev,
                  bg_color: 'white',
                }));
              }}
              className={tw('w-6 h-6 rounded-full', `bg-white`)}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
