import '../styles/globals.css';

import { Montserrat } from '@next/font/google';

import { AuthContextProvider } from './authContext';

const montSerrat = Montserrat({
  variable: '--montSerrat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montSerrat.className}>
      <head>
        <title>CowDev.</title>
      </head>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
