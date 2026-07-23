import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '../context/cart';
import ToastContainer from '../components/toast';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CartProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CartProvider>
    </>
  );
}
