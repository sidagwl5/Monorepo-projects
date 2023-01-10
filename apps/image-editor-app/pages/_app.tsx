import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '../configs/twind.config';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to image-editor-app!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
