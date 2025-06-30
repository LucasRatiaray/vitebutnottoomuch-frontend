import { ExportData, Site } from './types';
import exportData from '@/data/export.json';

// Importer les vraies données du backend
const siteData: ExportData = exportData as ExportData;

// Export des données principales
export const sites: Site[] = siteData.pages;
export const categories: string[] = siteData.stats.categories;
export const totalSites = siteData.stats.total;
export const avgScore = siteData.stats.avgVitebutnottoomuchScore;
export const stats = siteData.stats;

// Fonction pour récupérer tous les sites
export async function getAllSites(): Promise<Site[]> {
  return sites;
}

// Fonction pour récupérer un site par son slug
export async function getSiteBySlug(slug: string): Promise<Site | null> {
  return sites.find(site => site.slug === slug) || null;
}

export function getSiteBySlugSync(slug: string): Site | null {
  return sites.find(site => site.slug === slug) || null;
}

// Fonction pour récupérer les sites par catégorie
export async function getSitesByCategory(category: string): Promise<Site[]> {
  return sites.filter(site => 
    site.seo.categories.some(cat => 
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

export function getSitesByCategorySync(category: string): Site[] {
  return sites.filter(site => 
    site.seo.categories.some(cat => 
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

// Fonction pour récupérer les statistiques globales
export async function getStats() {
  return stats;
}

// Fonction pour récupérer les sites similaires
export async function getSimilarSites(currentSite: Site, limit: number = 3): Promise<Site[]> {
  return sites
    .filter(site => site.id !== currentSite.id)
    .filter(site => 
      site.seo.categories.some(cat => 
        currentSite.seo.categories.includes(cat)
      )
    )
    .sort((a, b) => b.seo.vitebutnottoomuchScore - a.seo.vitebutnottoomuchScore)
    .slice(0, limit);
}

// Fonction pour récupérer les sites les mieux notés
export async function getTopSites(limit: number = 5): Promise<Site[]> {
  return sites
    .sort((a, b) => b.seo.vitebutnottoomuchScore - a.seo.vitebutnottoomuchScore)
    .slice(0, limit);
}

export function getTopSitesSync(limit: number = 5): Site[] {
  return sites
    .sort((a, b) => b.seo.vitebutnottoomuchScore - a.seo.vitebutnottoomuchScore)
    .slice(0, limit);
}

// Fonction pour récupérer les sites récents
export async function getRecentSites(limit: number = 6): Promise<Site[]> {
  return sites
    .sort((a, b) => new Date(b.enrichedAt).getTime() - new Date(a.enrichedAt).getTime())
    .slice(0, limit);
}

export function getRecentSitesSync(limit: number = 6): Site[] {
  return sites
    .sort((a, b) => new Date(b.enrichedAt).getTime() - new Date(a.enrichedAt).getTime())
    .slice(0, limit);
}

// Fonction helper pour les variants de badge selon le score
export function getScoreVariant(score: number): "default" | "secondary" | "outline" {
  if (score >= 8) return "default";
  if (score >= 6.5) return "secondary";
  return "outline";
}

// Fonction pour générer les paramètres statiques
export function getAllSlugs(): string[] {
  return sites.map(site => site.slug);
}

// Fonction pour rechercher des sites
export function searchSites(query: string): Site[] {
  const lowercaseQuery = query.toLowerCase();
  return sites.filter(site => 
    site.title.toLowerCase().includes(lowercaseQuery) ||
    site.metaDescription.toLowerCase().includes(lowercaseQuery) ||
    site.siteInfo.domain.toLowerCase().includes(lowercaseQuery) ||
    site.seo.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    site.seo.categories.some(cat => cat.toLowerCase().includes(lowercaseQuery))
  );
}

// Fonction pour filtrer par score
export function filterSitesByScore(minScore: number, maxScore: number = 10): Site[] {
  return sites.filter(site => 
    site.seo.vitebutnottoomuchScore >= minScore && 
    site.seo.vitebutnottoomuchScore <= maxScore
  );
}

// Fonction pour filtrer par technologies
export function filterSitesByTechnology(technology: string): Site[] {
  return sites.filter(site => {
    const tech = site.siteInfo.technologies;
    return (
      tech.frameworks?.frontend?.some(t => t.toLowerCase().includes(technology.toLowerCase())) ||
      tech.frameworks?.backend?.some(t => t.toLowerCase().includes(technology.toLowerCase())) ||
      tech.cms?.some(t => t.toLowerCase().includes(technology.toLowerCase())) ||
      tech.analytics?.some(t => t.toLowerCase().includes(technology.toLowerCase()))
    );
  });
}