// src/app/layout.tsx
import type { Metadata } from 'next';
import { Unbounded, DM_Sans } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import TopLight from '@/components/top-light';

export const fontDMSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const fontUnbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'vitebutnottoomuch',
  description: 'La boîte à liens qui recense les meilleures ressources web.',
  metadataBase: new URL('https://vitebutnottoomuch.me'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      // Ajoutez d'autres langues si nécessaire
    },
  },
  openGraph: {
    title: 'vitebutnottoomuch',
    description: 'Bookmark for Websites',
    url: 'https://vitebutnottoomuch.me',
    siteName: 'vitebutnottoomuch',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'vitebutnottoomuch – bannière',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vitebutnottoomuch',
    description: 'Bookmark for Websites',
    images: ['/images/milky-way-night-sky-stars.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Head>
        {/* Light mode */}
        <meta
          name="theme-color"
          content="#6c5dd3"
          media="(prefers-color-scheme: light)"
        />
        {/* Dark mode */}
        <meta
          name="theme-color"
          content="#3a2a5e"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <body
        className={cn(
          fontUnbounded.variable,
          fontDMSans.variable,
          'antialiased',
          'h-full'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopLight />
          <Navbar />
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
