import Notification from './Notification';
import {
  SnackbarProvider as NotistackSnackbarProvider,
  closeSnackbar,
} from 'notistack';
import { ReactElement } from 'react';
import { tw } from 'twind';

export const SnackbarProvider = ({
  children,
  excludePaths = [],
}: {
  children: ReactElement;
  excludePaths: string[];
}) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      preventDuplicate
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      classes={{
        root: tw('min-w-max!'),
      }}
      onEnter={(element, _, key) => {
        if (excludePaths.includes(window.location.pathname)) {
          closeSnackbar(key);
          element.style.display = 'none';
        }
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
