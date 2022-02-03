import '../styles/globals.scss';
import {AppProps} from "next/dist/shared/lib/router/router";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Top app</title>
        <meta name="description" content="Learn project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
