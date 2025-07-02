import type { Site } from '@/lib/types';

export interface BentoItem {
  title: string;
  description: string;
  icon?: string; // Use string instead of React.ReactNode for server safety
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  // Extensions pour les sites
  type?: 'site' | 'default';
  site?: Site;
  image?: string;
  favicon?: string;
  domain?: string;
  score?: number;
  readingTime?: number;
  technologies?: string[];
  href?: string;
  externalUrl?: string;
}

// Fonction utilitaire pour convertir un Site en BentoItem (server-safe)
export function siteTobentoItem(site: Site): BentoItem {
  const getTechBadges = () => {
    const techs = [];
    if (site.siteInfo.technologies.frameworks?.frontend) {
      techs.push(...site.siteInfo.technologies.frameworks.frontend.slice(0, 2));
    }
    if (site.siteInfo.technologies.frameworks?.backend) {
      techs.push(...site.siteInfo.technologies.frameworks.backend.slice(0, 1));
    }
    return techs.slice(0, 2);
  };

  const cleanTitle = site.title
    .replace(/^[\w.-]+ - /, '')
    .split(' Vitebutnottoomuch')[0];

  return {
    type: 'site',
    title: cleanTitle,
    description: site.metaDescription,
    icon: 'external-link', // Use string identifier instead of JSX
    meta: site.siteInfo.domain,
    tags: site.seo.categories.slice(0, 2),
    site,
    image: site.siteInfo.logo,
    favicon: site.siteInfo.favicon,
    domain: site.siteInfo.domain,
    score: site.seo.vitebutnottoomuchScore,
    readingTime: site.seo.readingTime,
    technologies: getTechBadges(),
    href: `/sites/${site.slug}`,
    externalUrl: site.url,
    cta: "Voir l'analyse",
    status: 'Live',
  };
}
