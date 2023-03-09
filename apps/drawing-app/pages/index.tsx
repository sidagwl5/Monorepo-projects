import { tw } from 'twind';
import LayoutOptions from '../pages-code/index/components/LayoutOptions';
import { useState } from 'react';
import { layouts } from '../pages-code/index/staticData';
import DrawingUI from '../pages-code/index/components/DrawingUI';
import { Button } from 'ui-lib';

const DrawingApp = () => {
  const [proceed, setProceed] = useState(false);

  return (
    <section
      id="root_container"
      className={tw(
        'w-full h-screen p-3 bg-[#3A3335] flex justify-center items-center'
      )}
    >
      {!proceed ? (
        <LayoutOptions>
          <Button onClick={setProceed.bind(this, true)} className="self-center">
            Proceed
          </Button>
        </LayoutOptions>
      ) : (
        <DrawingUI />
      )}
    </section>
  );
};

export default DrawingApp;
