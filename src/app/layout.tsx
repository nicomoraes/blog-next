import './globals.css';

import type { Metadata } from 'next';
import { Playfair_Display, Roboto_Flex } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Página inicial',
  description: 'Portfolio Website',
  icons: {
    icon: '/favicon.png',
  },
};

export const pfDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-pf-display',
  display: 'swap',
});

export const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${pfDisplay.variable} ${robotoFlex.variable}`}
    >
      <body>
        {/* <HireMeBanner /> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
