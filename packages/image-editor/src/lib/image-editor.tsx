import { tw, css } from 'twind/style';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { Content } from '../components/Content';
import { Sidebar } from '../components/Sidebar';

export const ImageEditor = () => {
  const [array, setArray] = useState([
    {
      icon: <TuneIcon className={tw('text-white text-[20px]')} />,
      title: 'Adjustments',
      cssProperty: 'filters',
      type: 'adjustments',
      options: [
        {
          name: 'Brightness',
          property: 'brightness',
          props: {
            min: 0,
            max: 200,
            value: 100,
          },
          units: '%',
        },
        {
          name: 'Contrast',
          property: 'contrast',
          props: {
            min: 0,
            max: 200,
            value: 100,
          },
          units: '%',
        },
        {
          name: 'Saturation',
          property: 'saturate',
          props: {
            min: 0,
            max: 200,
            value: 100,
          },
          units: '%',
        },
        {
          name: 'Sepia',
          property: 'sepia',
          props: {
            min: 0,
            max: 100,
            value: 0,
          },
          units: '%',
        },
        {
          name: 'Grayscale',
          property: 'grayscale',
          props: {
            min: 0,
            max: 100,
            value: 0,
          },
          units: '%',
        },
        {
          name: 'Opacity',
          property: 'opacity',
          props: {
            min: 0,
            max: 100,
            value: 100,
          },
          units: '%',
        },
        {
          name: 'Invert',
          property: 'invert',
          props: {
            min: 0,
            max: 100,
            value: 0,
          },
          units: '%',
        },
        {
          name: 'Blur',
          property: 'blur',
          props: {
            min: 0,
            max: 20,
            value: 0,
          },
          units: 'px',
        },
        {
          name: 'Hue',
          property: 'hue-rotate',
          props: {
            min: 0,
            max: 360,
            value: 0,
          },
          units: 'deg',
        },
      ],
    },
    {
      icon: <DashboardIcon className={tw('text-white text-[20px]')} />,
      title: 'Layouts',
      options: [],
    },
    {
      icon: <PhotoFilterIcon className={tw('text-white text-[20px]')} />,
      title: 'Filters',
      cssProperty: 'filters',
      type: 'predefinedFilters',
      options: [
        {
          name: 'X-PRO 2',
          predefinedFilterValue:
            'contrast(1.3) brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-20deg)',
        },
        {
          name: 'Willow',
          predefinedFilterValue:
            'saturate(0.02) contrast(0.85) brightness(1.2) sepia(0.02)',
        },
        {
          name: 'Walden',
          predefinedFilterValue:
            'sepia(0.35) contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)',
        },
        {
          name: 'Valencia',
          predefinedFilterValue: 'sepia(0.15) saturate(1.5) contrast(0.9)',
        },
        {
          name: 'Toaster',
          predefinedFilterValue:
            'sepia(0.4) saturate(2.5) hue-rotate(-30deg) contrast(0.67)',
        },
        {
          name: 'Sutro',
          predefinedFilterValue:
            'brightness(0.75) contrast(1.3) sepia(0.5) hue-rotate(-25deg)',
        },
        {
          name: 'Sierra',
          predefinedFilterValue: 'contrast(0.8) saturate(1.2) sepia(0.15)',
        },
      ],
    },
  ]);
  const [active, setActive] = useState(0);

  return (
    <div
      className={tw(
        'w-full h-screen bg-[#131313]',
        css({
          '&': {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gridTemplateRows: 'auto 1fr',
            gridTemplateAreas: "'header header' 'sidebar canvas'",
          },
        })
      )}
    >
      <section
        className={tw(
          'min-h-[60px] relative bg-[#282222]',
          css({
            '&': { gridArea: 'header', borderBottom: '1px solid #574545' },
          })
        )}
        id="header"
      >
        header
      </section>

      <Sidebar stateOptions={[active, setActive]} />
      <Content data={array[active]} />
    </div>
  );
};
