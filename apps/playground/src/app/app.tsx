import { Alert } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import { tw } from 'twind';
import { DrawingApp } from '../features/drawingApp';
import { useDrawingContext } from '../features/drawingApp/Context';
import { ColorPickerForCanvasBg } from '../experiments/ColorPickerForCanvasBg';

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
      {!currentAspectRatio ? (
        <div
          className={tw(
            'flex h-full flex-col gap-7 bg-SecondaryBg items-center sm:items-start justify-center text-white'
          )}
        >
          <h1 className={tw('text-2xl md:text-2.5xl font-semibold')}>
            Choose Layout:
          </h1>
          <div
            className={tw(
              'flex justify-center w-full gap-4 flex-wrap md:gap-10'
            )}
          >
            {layouts.map(({ title, value }) => (
              <div
                onClick={() => setCurrentAspectRatio(value)}
                className={tw(
                  'w-24 h-24 bg-white bg-opacity-10 rounded-md font-medium hover:bg-opacity-20 cursor-pointer flex justify-center items-center'
                )}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DrawingApp />
      )}
    </SnackbarProvider>
  );
}

export default App;
