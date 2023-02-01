import { Alert } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import DrawingApp from '../features/drawingApp';

const SnackbarComponent = forwardRef(
  (
    {
      snackbarKey,
      message,
    }: {
      snackbarKey: any;
      message: any;
    },
    ref
  ) => {
    const { closeSnackbar } = useSnackbar();

    const close = () => {
      closeSnackbar(snackbarKey);
    };

    return (
      <Alert
        onClose={close}
        elevation={6}
        ref={ref}
        variant={'standard'}
        severity={message?.variant}
      >
        {message?.message}
      </Alert>
    );
  }
);

export function App() {
  return (
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={3000}
      preventDuplicate
      content={(snackbarKey, message) => {
        return (
          <SnackbarComponent snackbarKey={snackbarKey} message={message} />
        );
      }}
    >
      <DrawingApp />
    </SnackbarProvider>
  );
}

export default App;
