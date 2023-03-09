import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chatbot } from '../pages/chatbot';
import Dashboard from '../pages/dashboard/Dashboard';
import { tw } from 'twind';
import { StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'ui-lib';
import useHandleNotifications from '../hooks/useHandleNotifications';

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className={tw('w-full h-screen flex gap-2')}>
        <SnackbarProvider excludePaths={['/chatbot']}>
          <BrowserRouter>
            {useHandleNotifications()}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
