import Notification from 'apps/drawing-app/components/notification/Notification';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
import { tw } from 'twind';

const SnackbarProvider = ({ children }) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      preventDuplicate
      classes={{
        root: tw('min-w-max!'),
      }}
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
