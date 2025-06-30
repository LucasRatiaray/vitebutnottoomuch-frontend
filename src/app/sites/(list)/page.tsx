import type { Metadata } from 'next';
import SiteCard from '@/components/site-card';
import { getAllSites } from '@/lib/data';

export const generateMetadata = (): Metadata => ({
  title: 'Sites Web Analysés',
  description: 'Découvrez tous les sites web de notre catalogue Vitebutnottoomuch. Chaque site est analysé et évalué pour son équilibre parfait entre performance et fonctionnalités.',
  keywords: ['vitebutnottoomuch', 'sites web', 'performance', 'analyse', 'catalogue'],
  alternates: {
    canonical: '/sites',
  },
  openGraph: {
    title: 'Sites Web Analysés | Vitebutnottoomuch',
    description: 'Catalogue complet des sites web analysés selon les critères Vitebutnottoomuch.',
    url: '/sites',
    type: 'website',
  },
});

export default async function SitesPage() {
  const sites = await getAllSites();

  return (
    <>
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </>
  );
}