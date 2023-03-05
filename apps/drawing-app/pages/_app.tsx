import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { StyledEngineProvider } from '@mui/material';
import { DrawingContextProvider } from '../pages-code/index/Context';
import SnackbarProvider from '../modules/SnackbarProvider/SnackbarProvider';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to drawing-app!</title>
      </Head>

      <SnackbarProvider>
        <StyledEngineProvider injectFirst>
          <DrawingContextProvider>
            <Component {...pageProps} />
          </DrawingContextProvider>
        </StyledEngineProvider>
      </SnackbarProvider>
    </>
  );
}

export default CustomApp;
