import type { Metadata } from 'next';
import HomeClient from './HomeClient';

/* ---------- SEO ---------- */
export const metadata: Metadata = {
  title: 'vitebutnottoomuch – Accueil',
  description:
    'Une collection organisée de sites web incontournables et inspirants.',

  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    url: '/',
    title: 'vitebutnottoomuch – Accueil',
    description:
      'Une collection soignée de sites web incontournables pour designers et développeurs.',
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
};
/* ------------------------- */

export default function Home() {
  return <HomeClient />;
}
