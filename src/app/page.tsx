// File: src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './HomeClient';

/* ---------- SEO ---------- */
export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Vitebutnottoomuch - Découvrez notre catalogue exclusif de sites web analysés pour leur performance équilibrée. Chaque site incarne parfaitement la philosophie vitebutnottoomuch : vitesse optimale et fonctionnalités riches.',
  keywords: ['vitebutnottoomuch', 'catalogue sites web', 'performance web', 'analyse sites', 'vitesse optimale', 'équilibre web'],
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    url: '/',
    title: 'Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée',
    description:
      'Découvrez notre sélection exclusive de sites web analysés sous l\'angle vitebutnottoomuch. Performance optimale et équilibre parfait.',
    type: 'website',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'Vitebutnottoomuch - Catalogue de Performance Web',
      },
    ],
  },
};
/* ------------------------- */

export default function Home() {
  return <HomeClient />;
}
