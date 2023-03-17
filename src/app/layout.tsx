import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Playfair_Display, Roboto_Flex } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Página inicial',
  description: 'Portfolio Website',
  icons: {
    icon: '/favicon.png',
  },
};

export const pf_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-pf-display',
  display: 'swap',
});

export const roboto_flex = Roboto_Flex({
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
      className={`${pf_display.variable} ${roboto_flex.variable}`}
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
