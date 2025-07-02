import type { Metadata } from 'next';
import { BentoGrid } from '@/components/bento-grid';
import { siteTobentoItem } from '@/lib/bento-utils';
import { getAllSites } from '@/lib/data';

export const generateMetadata = (): Metadata => ({
  title: 'Sites Web Analysés',
  description:
    'Découvrez tous les sites web de notre catalogue Vitebutnottoomuch. Chaque site est analysé et évalué pour son équilibre parfait entre performance et fonctionnalités.',
  keywords: [
    'vitebutnottoomuch',
    'sites web',
    'performance',
    'analyse',
    'catalogue',
  ],
  alternates: {
    canonical: '/sites',
  },
  openGraph: {
    title: 'Sites Web Analysés | Vitebutnottoomuch',
    description:
      'Catalogue complet des sites web analysés selon les critères Vitebutnottoomuch.',
    url: '/sites',
    type: 'website',
  },
});

export default async function SitesPage() {
  const sites = await getAllSites();

  return <BentoGrid items={sites.map((site) => siteTobentoItem(site))} />;
}
