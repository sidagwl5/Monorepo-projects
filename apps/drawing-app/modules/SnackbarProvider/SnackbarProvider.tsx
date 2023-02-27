import Notification from 'apps/drawing-app/components/notification/Notification';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
import { tw } from 'twind';

const SnackbarProvider = ({ children }) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={300000}
      preventDuplicate
      classes={{
        root: tw('min-w-max!'),
      }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      Components={{
        default: Notification,
        success: Notification,
        error: Notification,
        info: Notification,
        warning: Notification,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};

export default SnackbarProvider;
