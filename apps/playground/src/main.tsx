import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './main.css';

import App from './app/app';
import { DrawingContext } from './features/drawingApp/Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <DrawingContext>
      <App />
    </DrawingContext>
  </StrictMode>
);
