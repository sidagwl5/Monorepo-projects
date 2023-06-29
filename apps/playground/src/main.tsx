import * as ReactDOM from 'react-dom/client';
import './main.css';

import DrawingApp from './features/drawingApp';
import { DrawingContext } from './features/drawingApp/Context';
import { useState } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RenderIframe = () => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <button
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 10000,
          padding: '0.6rem 1.5rem',
          background: 'yellow',
          fontWeight: 500,
          color: 'black',
          borderRadius: '20px',
        }}
        onClick={setExpand.bind(this, !expand)}
      >
        {expand ? 'Un-expand' : 'Expand'}
      </button>
      <DrawingContext>
        {expand && <DrawingApp />}
        <iframe
          src="https://quest-dev.intract.io/"
          title="Intract"
          style={{
            width: '100%',
            height: '100vh',
          }}
          frameBorder={0}
        />
      </DrawingContext>
    </>
  );
};

root.render(
  // <StrictMode>
  // <DrawingContext>
  <RenderIframe />
  // </DrawingContext>
  // {/* </StrictMode> */}
);
