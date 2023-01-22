import { Switch, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { tw, css } from 'twind/style';
import DoneIcon from '@mui/icons-material/Done';

const settingsOption = [
  {
    title: 'Smooth Line',
    key: 'smooth_line',
  },
  {
    title: 'Line-Join (Round)',
    key: 'round_line_join',
  },
  {
    title: 'Line-Cap (Round)',
    key: 'round_line_cap',
  },
];

export const DrawSettings = ({
  context,
  canvas,
}: {
  context: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
}) => {
  const [drawSettings, setDrawSettings] = useState({
    smooth_line: true,
    round_line_join: true,
    round_line_cap: true,
    color: 'white',
    width: '1',
  });

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (context) {
      context.strokeStyle = drawSettings.color;
      context.lineWidth = Number(drawSettings.width);
      context.lineJoin = drawSettings.round_line_join ? 'round' : 'miter';
      context.lineCap = drawSettings.round_line_cap ? 'round' : 'butt';
    }
  }, [drawSettings]);

  return (
    <>
      <div className={tw('text-white flex flex-col gap-1')}>
        <p className={tw('font-medium text-sm capitalize')}>stroke width</p>
        <input
          className={tw(
            'px-2 py-1 rounded-md',
            css({ background: 'rgba(255, 255, 255, 0.12)' })
          )}
          value={drawSettings.width as string}
          onChange={(e) =>
            setDrawSettings((prev) => ({
              ...prev,
              width: e.target.value,
            }))
          }
          type="text"
        />
      </div>

      <div className={tw('text-white flex flex-col gap-1')}>
        <p className={tw('font-medium text-sm capitalize')}>Colors</p>
        <div className={tw('w-full flex gap-2')}>
          {['green', 'blue', 'red', 'pink', 'yellow'].map((color) => (
            <Tooltip arrow title={color} disableInteractive placement="top">
              <div className={tw('relative cursor-pointer')}>
                {color === drawSettings.color && (
                  <div
                    onClick={() => {
                      setDrawSettings((prev: any) => ({
                        ...prev,
                        color,
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
                    setDrawSettings((prev: any) => ({
                      ...prev,
                      color,
                    }));
                  }}
                  className={tw('w-6 h-6 rounded-full', `bg-${color}-400`)}
                />
              </div>
            </Tooltip>
          ))}

          <Tooltip arrow title={'white'} disableInteractive placement="top">
            <div className={tw('relative cursor-pointer')}>
              {'white' === drawSettings.color && (
                <div
                  onClick={() => {
                    setDrawSettings((prev: any) => ({
                      ...prev,
                      color: 'white',
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
                  setDrawSettings((prev: any) => ({
                    ...prev,
                    color: 'white',
                  }));
                }}
                className={tw('w-6 h-6 rounded-full', `bg-white`)}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className={tw('flex flex-col gap-2')}>
        {settingsOption.map(({ key, title }) => (
          <div className={tw('flex justify-between items-center')}>
            <p className={tw('font-medium text-white text-sm capitalize')}>
              {title}
            </p>
            <Switch
              onChange={(_, checked) => {
                setDrawSettings((prev: any) => ({
                  ...prev,
                  [key]: checked,
                }));
              }}
              classes={{ track: tw('bg-yellow-400!') }}
              checked={drawSettings[key]}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DrawSettings;