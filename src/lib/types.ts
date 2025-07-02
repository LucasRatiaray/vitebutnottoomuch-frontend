// Types correspondant aux données du backend Vitebutnottoomuch

export interface Technology {
  cms?: string[];
  frameworks?: {
    frontend?: string[];
    backend?: string[];
  };
  analytics?: string[];
  cdn?: string[];
  hosting?: string[];
  payment?: string[];
  marketing?: string[];
}

export interface Performance {
  loadTime?: number;
  firstPaint?: number;
}

export interface SiteInfo {
  domain: string;
  favicon?: string;
  logo?: string;
  technologies: Technology;
  performance?: Performance;
}

export interface ContentSection {
  title: string;
  content: string;
}

export interface SiteContent {
  introduction: string;
  sections: ContentSection[];
  conclusion: string;
}

export interface SiteSEO {
  categories: string[];
  tags: string[];
  keywords: string[];
  vitebutnottoomuchScore: number;
  wordCount: number;
  readingTime: number;
}

export interface Site {
  id: string;
  slug: string;
  url: string;
  title: string;
  metaDescription: string;
  scrapedAt: string;
  enrichedAt: string;
  lastModified?: string;
  siteInfo: SiteInfo;
  content: SiteContent;
  seo: SiteSEO;
}

export interface DataStats {
  total: number;
  enriched: number;
  categories: string[];
  technologies: Record<string, number>;
  avgVitebutnottoomuchScore: number;
}

export interface ExportData {
  version: string;
  generated: string;
  lastUpdate: string;
  stats: DataStats;
  pages: Site[];
}

// Types d'interface pour les composants
export interface CategoryPageProps {
  sites: Site[];
  category: string;
}

export interface SiteDetailProps {
  site: Site;
  relatedSites?: Site[];
}

// Helper type pour les badges de score
export type ScoreVariant = "default" | "secondary" | "outline";

export interface ScoreBadgeProps {
  score: number;
  className?: string;
}