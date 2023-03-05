import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chatbot } from '../pages/chatbot';
import Dashboard from '../pages/dashboard/Dashboard';
import { tw } from 'twind';
import { StyledEngineProvider } from '@mui/material';

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className={tw('w-full h-screen flex gap-2 bg-rootContainerClr')}>
        <BrowserRouter>
          <Routes>
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
