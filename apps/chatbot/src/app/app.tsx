import { StyledEngineProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { tw } from 'twind';
import { SnackbarProvider } from 'ui-lib';
import useHandleNotifications from '../hooks/useHandleNotifications';
import QueryClientProvider from '../modules/react-query';
import { Chatbot } from '../pages/chatbot';
import Dashboard from '../pages/dashboard/Dashboard';
import { Login } from '../pages/login/Login';
import AuthWrapper from '../wrappers/AuthWrapper';

export function App() {
  return (
    <QueryClientProvider>
      <StyledEngineProvider injectFirst>
        <div className={tw('w-full h-screen flex gap-2')}>
          <SnackbarProvider excludePaths={['/chatbot']}>
            <BrowserRouter>
              {useHandleNotifications()}
              <Routes>
                <Route element={<AuthWrapper />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </div>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
