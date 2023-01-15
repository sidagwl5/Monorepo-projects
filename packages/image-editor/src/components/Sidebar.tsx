import { css, tw } from 'twind/style';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Slidebar } from './Slidebar';
import { CanvasHandler } from '../classes/CanvasHandler.class';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import FlipIcon from '@mui/icons-material/Flip';

const dummy = [
  {
    icon: <TuneIcon className={tw('text-white text-[20px]')} />,
    title: 'Tuning',
    key: 'tuning',
    render: () => {
      const options = [
        {
          title: 'Brightness',
          key: 'brightness',
          props: {
            max: 200,
            min: 0,
            defaultValue: 100,
            value: 100,
          },
          unit: '%',
        },
        {
          title: 'Saturate',
          key: 'saturate',
          props: {
            max: 200,
            min: 0,
            defaultValue: 100,
            value: 100,
          },
          unit: '%',
        },
      ];

      return options.map(({ title, props }) => (
        <div className={tw('flex flex-col gap-1')}>
          <p className={tw('text-sm text-opacity-80')}>{title}</p>
          <Slidebar
            {...props}
            setValue={(value: number) => {
              props.value = value;
              const _filter = options
                .map(
                  (_option) => `${_option.key}(${props.value}${_option.unit})`
                )
                .join(' ');

              CanvasHandler.applyFilter(_filter);
            }}
          />
        </div>
      ));
    },
  },
  {
    icon: <PhotoFilterIcon className={tw('text-white text-[20px]')} />,
    title: 'Filters',
    key: 'filters',
    type: 'predefinedFilters',
    render: () => {
      const options = [
        {
          title: 'X-PRO 2',
          value:
            'contrast(1.3) brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-20deg)',
        },
        {
          title: 'Willow',
          value: 'saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02)',
        },
        {
          title: 'Walden',
          value:
            'sepia(0.35) contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)',
        },
        {
          title: 'Valencia',
          value: 'sepia(0.15) saturate(1.5) contrast(0.9)',
        },
        {
          title: 'Toaster',
          value: 'sepia(0.4) saturate(2.5) hue-rotate(-30deg) contrast(0.67)',
        },
        {
          title: 'Sutro',
          value: 'brightness(0.75) contrast(1.3) sepia(0.5) hue-rotate(-25deg)',
        },
        {
          title: 'Sierra',
          value: 'contrast(0.8) saturate(1.2) sepia(0.15)',
        },
      ];

      return (
        <div
          className={tw(
            'w-full gap-3',
            css({
              '&': { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' },
            })
          )}
        >
          {options.map(({ value }) => (
            <div
              onClick={() => {
                CanvasHandler.applyFilter(value);
              }}
              className={tw('w-full cursor-pointer')}
            >
              <img
                className={tw(
                  'w-full h-full object-contain',
                  css({ '&': { filter: value } })
                )}
                src="https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"
                alt=""
              />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    icon: <TuneIcon className={tw('text-white text-[20px]')} />,
    title: 'Adjustments',
    key: 'adjustment',
    render: () => {
      const options = [
        {
          title: 'FlipX',
          key: 'flipX',
          icon: <FlipIcon />,
          onClick: () => {
            CanvasHandler.applyHorizontalFlip();
          },
        },
        {
          title: 'FlipY',
          key: 'flipY',
          icon: <FlipIcon className={tw('rotate-90')} />,
          onClick: () => {
            CanvasHandler.applyVerticalFlip();
          },
        },
      ];

      const rotationOptions = [
        {
          title: '90deg',
          key: 'flipX',
          icon: <FlipIcon />,
          onClick: () => {
            CanvasHandler.applyRotation(Math.PI / 2);
          },
        },
        {
          title: '180deg',
          key: 'flipY',
          icon: <FlipIcon className={tw('rotate-90')} />,
          onClick: () => {
            CanvasHandler.applyRotation(Math.PI);
          },
        },
        {
          title: '270deg',
          key: 'flipY',
          icon: <FlipIcon className={tw('rotate-90')} />,
          onClick: () => {
            CanvasHandler.applyRotation((Math.PI / 2) * 3);
          },
        },
      ];

      return (
        <>
          <div className={tw('flex flex-col gap-3')}>
            <p className={tw('text-sm text-opacity-80')}>Flip</p>
            <div className={tw('flex gap-3')}>
              {options.map(({ icon, onClick }) => (
                <button
                  onClick={onClick}
                  className={tw('h-10 w-10 bg-white bg-opacity-10 rounded-md')}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className={tw('flex flex-col gap-3')}>
            <p className={tw('text-sm text-opacity-80')}>Rotate</p>
            <div className={tw('flex gap-3')}>
              {rotationOptions.map(({ title, onClick }) => (
                <button
                  onClick={onClick}
                  className={tw('h-10 w-10 bg-white bg-opacity-10 rounded-md')}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </>
      );
    },
  },
];

export const Sidebar = ({ stateOptions }: { stateOptions: any[] }) => {
  const [active, setActive] = stateOptions;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <section className={tw('flex max-w-[400px]')}>
      <section
        className={tw(
          'min-w-[42px] relative bg-[#282222]',
          css({
            '&': { gridArea: 'sidebar', borderRight: '1px solid #574545' },
          })
        )}
        id="sidebar"
      >
        {dummy.map(({ icon, key }) => (
          <div
            key={key}
            onClick={() => {
              if (active !== key) {
                setActive(key);
                setSidebarOpen(true);
              } else setActive(null);
            }}
            className={tw(
              'w-full h-[42px] hover:bg-[#3E3E3E] cursor-pointer flex items-center justify-center relative',
              active === key && 'bg-primaryTextColor!'
            )}
          >
            {icon}
          </div>
        ))}
      </section>

      {dummy.map(({ key, title, options, render }) =>
        active === key ? (
          <section
            key={key}
            className={tw(
              'bg-[#282222] p-3 text-white relative',
              sidebarOpen ? 'w-[250px]' : 'w-[42px]',
              css({ transition: '0.2s all ease-out' })
            )}
          >
            <div className={tw('flex items-center justify-between')}>
              <h2
                className={tw(
                  'text-lg font-medium block',
                  !sidebarOpen && 'hidden!',
                  css({ transition: '0.2s all ease-out' })
                )}
              >
                {title}
              </h2>
              <ChevronRightIcon
                onClick={setSidebarOpen.bind(this, !sidebarOpen)}
                className={tw(
                  'text-2xl cursor-pointer relative -left-1',
                  !sidebarOpen ? 'rotate-0' : 'rotate-180',
                  css({ transition: '0.2s all ease-out' })
                )}
              />
            </div>

            <div className={tw(sidebarOpen ? 'opacity-100' : 'opacity-0')}>
              <div className={tw('w-full mt-6 flex flex-col gap-2')}>
                <>{render()}</>
              </div>
            </div>
          </section>
        ) : null
      )}
    </section>
  );
};
