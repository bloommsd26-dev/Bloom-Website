import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateMetadata } from '@/utils/seo';
import './globals.css';

export const metadata: Metadata = {
  ...generateMetadata(
    'Bloom',
    'A student-run Maxfort School initiative built around weekly study circles, voice rooms, creative labs, and care drives.'
  ),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#965420" />
        <meta name="darkreader-lock" />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
