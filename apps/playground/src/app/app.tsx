import { Alert } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import { tw } from 'twind';
import { DrawingApp } from '../features/drawingApp';
import { useDrawingContext } from '../features/drawingApp/Context';
import { MoveSelectedDoodles } from '../experiments/MoveSelectedDoodles';

const layouts = [
  { title: '4:3', value: 4 / 3 },
  { title: '3:4', value: 3 / 4 },
  { title: '16:9', value: 16 / 9 },
  { title: '9:16', value: 9 / 16 },
];

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
  const { setCurrentAspectRatio, currentAspectRatio } = useDrawingContext();

  return <MoveSelectedDoodles />;
}

export default App;
