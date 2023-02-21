import { tw } from 'twind';
import LayoutOptions from '../pages-code/index/components/LayoutOptions';
import { useState } from 'react';
import { layouts } from '../pages-code/index/staticData';

const DrawingApp = () => {
  const [currentAspectRatio, setCurrentAspectRatio] = useState(
    layouts[0].value
  );

  return (
    <section
      className={tw(
        'w-full min-h-screen bg-[#3A3335] flex justify-center items-center'
      )}
    >
      <LayoutOptions
        handleAspectRatio={[currentAspectRatio, setCurrentAspectRatio]}
      />
    </section>
  );
};

export default DrawingApp;
