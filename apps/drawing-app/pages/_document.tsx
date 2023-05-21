import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="author" content="Siddharth Agrawal" />
        <meta content="Drawing App" name="title" />
        <meta content="An intuitive app for drawing" name="description" />
        <meta
          name="keywords"
          content="drawing, canvas, path, strokes, png, jpeg, doodle"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free online Drawing App" />
        <meta
          property="og:description"
          content="An intuitive app for drawing"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/monorepo-projects.appspot.com/o/Drawing_Meta_Image.PNG?alt=media"
        />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="720" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32, 64x64"
          href="/squiggle.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
