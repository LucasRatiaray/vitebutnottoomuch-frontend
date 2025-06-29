import { BackendData, Site } from './types';

// Pour le développement, on utilise des données mockées
// En production, ceci sera remplacé par le fetch du JSON du backend
const MOCK_DATA: BackendData = {
  version: "2024-12-28T10:00:00Z",
  lastUpdate: "2024-12-28T10:00:00Z",
  stats: {
    total: 150,
    categories: ["E-commerce", "SaaS", "Blog", "Portfolio", "Fintech", "Design"],
    avgVitebutnottoomuchScore: 8.2
  },
  pages: [
    {
      id: "stripe-analyse",
      slug: "stripe-analyse-complete",
      url: "https://stripe.com",
      title: "Stripe - Analyse Complète de la Plateforme de Paiement Leader",
      metaDescription: "Découvrez Stripe : analyse approfondie de la plateforme de paiement qui révolutionne les transactions en ligne avec une approche Vitebutnottoomuch.",
      scrapedAt: "2024-12-27T15:30:00Z",
      enrichedAt: "2024-12-27T15:35:00Z",
      siteInfo: {
        domain: "stripe.com",
        favicon: "https://stripe.com/favicon.ico",
        logo: "https://stripe.com/logo.png",
        technologies: {
          cms: [],
          frameworks: {
            frontend: ["React", "Next.js"],
            backend: ["Ruby on Rails"]
          },
          analytics: ["Google Analytics"],
          cdn: ["Cloudflare"]
        },
        performance: {
          loadTime: 2341,
          firstPaint: 892
        }
      },
      content: {
        introduction: "Stripe est une plateforme de paiement en ligne qui a révolutionné la façon dont les entreprises acceptent les paiements sur internet.",
        sections: [
          {
            title: "Vue d'ensemble",
            content: "Stripe propose une API complète pour intégrer facilement les paiements dans n'importe quelle application web ou mobile."
          },
          {
            title: "Analyse technique",
            content: "L'architecture de Stripe repose sur des API RESTful robustes et une infrastructure cloud hautement disponible."
          },
          {
            title: "L'approche Vitebutnottoomuch",
            content: "Stripe illustre parfaitement le concept vitebutnottoomuch : une performance équilibrée entre vitesse d'exécution et richesse fonctionnelle."
          }
        ],
        conclusion: "Stripe reste une référence incontournable pour les paiements en ligne, alliant simplicité d'intégration et puissance technique."
      },
      seo: {
        categories: ["Fintech", "API", "Paiements"],
        tags: ["payment", "api", "stripe", "developer-friendly"],
        keywords: ["stripe", "paiement en ligne", "api payment", "vitebutnottoomuch"],
        vitebutnottoomuchScore: 9.2,
        wordCount: 1856,
        readingTime: 9
      }
    },
    {
      id: "figma-design",
      slug: "figma-design-collaboratif",
      url: "https://figma.com",
      title: "Figma - L'Outil de Design Collaboratif Vitebutnottoomuch",
      metaDescription: "Analyse complète de Figma : comment cet outil révolutionne le design collaboratif avec une approche Vitebutnottoomuch parfaite.",
      scrapedAt: "2024-12-27T14:20:00Z",
      enrichedAt: "2024-12-27T14:25:00Z",
      siteInfo: {
        domain: "figma.com",
        favicon: "https://figma.com/favicon.ico",
        logo: "https://figma.com/logo.png",
        technologies: {
          cms: [],
          frameworks: {
            frontend: ["React", "WebAssembly"],
            backend: ["Node.js"]
          },
          analytics: ["Google Analytics", "Mixpanel"],
          cdn: ["AWS CloudFront"]
        },
        performance: {
          loadTime: 1890,
          firstPaint: 650
        }
      },
      content: {
        introduction: "Figma a transformé le paysage du design numérique en proposant un outil collaboratif entièrement basé sur le web.",
        sections: [
          {
            title: "Innovation technique",
            content: "Figma utilise WebAssembly pour offrir des performances natives dans le navigateur, un exemple parfait de l'approche vitebutnottoomuch."
          },
          {
            title: "Collaboration en temps réel",
            content: "La synchronisation en temps réel permet à plusieurs designers de travailler simultanément sur le même fichier."
          },
          {
            title: "Philosophie Vitebutnottoomuch",
            content: "Figma démontre qu'il est possible d'avoir un outil puissant tout en restant rapide et accessible, incarnant parfaitement vitebutnottoomuch."
          }
        ],
        conclusion: "Figma continue d'être la référence du design collaboratif, prouvant que performance et fonctionnalités peuvent coexister harmonieusement."
      },
      seo: {
        categories: ["Design", "SaaS", "Collaboration"],
        tags: ["design", "figma", "collaboration", "ui-ux"],
        keywords: ["figma", "design collaboratif", "ui design", "vitebutnottoomuch"],
        vitebutnottoomuchScore: 8.8,
        wordCount: 1654,
        readingTime: 8
      }
    }
  ]
};

// Fonction pour charger les données du backend
export async function loadBackendData(): Promise<BackendData> {
  // En développement, on retourne les données mockées
  if (process.env.NODE_ENV === 'development') {
    return MOCK_DATA;
  }
  
  // En production, on chargerait le JSON du backend
  try {
    // const response = await fetch('/api/data.json');
    // const data = await response.json();
    // return data;
    return MOCK_DATA; // Temporaire jusqu'à ce que le backend soit connecté
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return MOCK_DATA; // Fallback sur les données mockées
  }
}

// Fonction pour récupérer tous les sites
export async function getAllSites(): Promise<Site[]> {
  const data = await loadBackendData();
  return data.pages;
}

// Fonction pour récupérer un site par son slug
export async function getSiteBySlug(slug: string): Promise<Site | null> {
  const data = await loadBackendData();
  return data.pages.find(site => site.slug === slug) || null;
}

// Fonction pour récupérer les sites par catégorie
export async function getSitesByCategory(category: string): Promise<Site[]> {
  const data = await loadBackendData();
  return data.pages.filter(site => 
    site.seo.categories.some(cat => 
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

// Fonction pour récupérer les statistiques globales
export async function getStats() {
  const data = await loadBackendData();
  return data.stats;
}

// Fonction pour récupérer les sites similaires
export async function getSimilarSites(currentSite: Site, limit: number = 3): Promise<Site[]> {
  const data = await loadBackendData();
  
  return data.pages
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
export async function getTopSites(limit: number = 10): Promise<Site[]> {
  const data = await loadBackendData();
  
  return data.pages
    .sort((a, b) => b.seo.vitebutnottoomuchScore - a.seo.vitebutnottoomuchScore)
    .slice(0, limit);
}

// Fonction pour récupérer les sites récents
export async function getRecentSites(limit: number = 6): Promise<Site[]> {
  const data = await loadBackendData();
  
  return data.pages
    .sort((a, b) => new Date(b.enrichedAt).getTime() - new Date(a.enrichedAt).getTime())
    .slice(0, limit);
}