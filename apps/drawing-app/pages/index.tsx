import { useState } from 'react';
import { tw } from 'twind';
import { Button } from 'ui-lib';
import DrawingUI from '../pages-code/index/components/DrawingUI';
import LayoutOptions from '../pages-code/index/components/LayoutOptions';

const DrawingApp = () => {
  const [proceed, setProceed] = useState(false);

  return (
    <section
      id="root_container"
      className={tw(
        'w-full h-screen p-1 sm:p-3 bg-rootContainerClr flex justify-center items-center'
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
