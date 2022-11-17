import type { AppProps } from 'next/app';
import { Montserrat } from '@next/font/google';

import '../styles/globals.css';

const montSerrat = Montserrat();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montSerrat.className}>
      <Component {...pageProps} />
    </main>
  );
}
