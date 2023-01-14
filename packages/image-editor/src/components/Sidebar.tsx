import { css, tw } from 'twind/style';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Slidebar } from './Slidebar';
import { CanvasHandler } from '../classes/CanvasHandler.class';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';

const dummy = [
  {
    icon: <TuneIcon className={tw('text-white text-[20px]')} />,
    title: 'Tuning',
    key: 'tuning',
    options: [
      {
        title: 'Brightness',
        key: 'brightness',
        props: {
          max: 200,
          min: 0,
          defaultValue: 100,
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
        },
        unit: '%',
      },
    ],
    valueResolver(_props: any) {
      const _this = this;
      return (
        <div className={tw('flex flex-col gap-1')}>
          <p className={tw('text-sm text-opacity-80')}>{_props.title}</p>
          <Slidebar
            {..._props.props}
            setValue={(value: number) => {
              const option = _this.options.find(
                (_option) => _option.key === _props.key
              );
              if (option) option.props.defaultValue = value;

              const _filter = _this.options
                .map(
                  (_option) =>
                    `${_option.key}(${_option.props.defaultValue}${_option.unit})`
                )
                .join(' ');

              CanvasHandler.applyFilter(_filter);
            }}
          />
        </div>
      );
    },
  },
  {
    icon: <PhotoFilterIcon className={tw('text-white text-[20px]')} />,
    title: 'Filters',
    key: 'filters',
    type: 'predefinedFilters',
    options: [
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
    ],
    valueResolver(_props: any) {
      return (
        <div
          onClick={() => {
            CanvasHandler.applyFilter(_props.value);
          }}
          className={tw('w-full cursor-pointer')}
        >
          <img
            className={tw(
              'w-full h-full object-contain',
              css({ '&': { filter: _props.value } })
            )}
            src="https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"
            alt=""
          />
        </div>
      );
    },
    templateWrapper(children: any) {
      return (
        <div
          className={tw(
            'w-full gap-3',
            css({
              '&': { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' },
            })
          )}
        >
          {children}
        </div>
      );
    },
  },
  {
    icon: <PhotoFilterIcon className={tw('text-white text-[20px]')} />,
    title: 'Adjustments',
    key: 'adjustments',
    options: [
      {
        title: 'FlipY',
        key: 'flip',
        value: -1,
      },
      {
        title: 'FlipY',
        key: 'flip',
        value: -1,
      },
    ],
    valueResolver(_props: any) {
      return (
        <button
          onClick={() => {
            CanvasHandler.applyHorizontalFlip(_props.value);
          }}
        >
          {_props.value}
        </button>
      );
    },
  },
];

dummy[0].valueResolver = dummy[0].valueResolver.bind(dummy[0]);
dummy[1].valueResolver = dummy[1].valueResolver.bind(dummy[1]);
dummy[2].valueResolver = dummy[2].valueResolver.bind(dummy[2]);

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

      {dummy.map(({ key, title, options, valueResolver, templateWrapper }) =>
        active === key ? (
          <section
            key={key}
            className={tw(
              'bg-[#282222] p-3 text-white relative',
              sidebarOpen ? 'w-[250px]' : 'w-[42px]',
              css({ transition: '0.2s all ease-out' })
            )}
          >
            {console.log(active, key, valueResolver)}
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
                {templateWrapper
                  ? templateWrapper(
                      options.map((v, idx: number) => valueResolver(v))
                    )
                  : options.map((v, idx: number) => valueResolver(v))}
              </div>
            </div>
          </section>
        ) : null
      )}
    </section>
  );
};
