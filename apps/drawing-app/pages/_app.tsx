import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { StyledEngineProvider } from '@mui/material';
import { DrawingContextProvider } from '../pages-code/index/Context';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to drawing-app!</title>
      </Head>
      <main className="app">
        <StyledEngineProvider injectFirst>
          <DrawingContextProvider>
            <Component {...pageProps} />
          </DrawingContextProvider>
        </StyledEngineProvider>
      </main>
    </>
  );
}

export default CustomApp;
