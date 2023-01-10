import { tw, css } from 'twind/style';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { Content } from '../components/Content';
import { Sidebar } from '../components/Sidebar';

export const ImageEditor = () => {
  const [array, setArray] = useState([
    {
      icon: <PhotoFilterIcon className={tw('text-white')} />,
      title: 'Filters',
      options: [
        {
          property: 'brightness',
          props: {
            min: 0,
            max: 200,
            value: 100,
          },
          units: '%',
        },
      ],
    },
    {
      icon: <DashboardIcon className={tw('text-white')} />,
      title: 'Layouts',
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

      <Sidebar
        stateOptions={[active, setActive]}
        options={array}
        setOptions={setArray}
      />
      <Content data={array[active]} />
    </div>
  );
};
