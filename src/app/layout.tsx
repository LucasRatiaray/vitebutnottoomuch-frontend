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
  title: {
    default: "Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée",
    template: "%s | Vitebutnottoomuch"
  },
  description: "Découvrez notre sélection de sites web analysés sous l'angle Vitebutnottoomuch. Catalogue de sites performants alliant vitesse et fonctionnalités dans un équilibre parfait.",
  keywords: ["vitebutnottoomuch", "performance web", "sites web", "catalogue", "analyse", "vitesse", "équilibre", "SEO"],
  authors: [{ name: "Vitebutnottoomuch" }],
  creator: "Vitebutnottoomuch",
  publisher: "Vitebutnottoomuch",
  metadataBase: new URL('https://vitebutnottoomuch.me'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://vitebutnottoomuch.me',
    title: 'Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée',
    description: 'Découvrez notre sélection de sites web analysés sous l\'angle Vitebutnottoomuch. Performance web optimale et équilibre parfait.',
    siteName: 'Vitebutnottoomuch',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'Vitebutnottoomuch - Catalogue de Performance Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée',
    description: 'Découvrez notre sélection de sites web analysés sous l\'angle Vitebutnottoomuch.',
    images: ['/images/og-default.webp'],
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
