import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateMetadata } from '@/utils/seo';
import { generateNGOOrganizationSchema } from '@/lib/utils/schema';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { env } from '@/lib/env';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

export const metadata: Metadata = {
  ...generateMetadata(
    'Bloom',
    'A student-run Maxfort School initiative built around weekly study circles, voice rooms, creative labs, and care drives.'
  ),
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateNGOOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#965420" />
        <meta name="darkreader-lock" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${libreBaskerville.variable} bg-white text-neutral-900 antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
