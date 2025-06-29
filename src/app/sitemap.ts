// File: src/app/sitemap.ts
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://vitebutnottoomuch.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/sites`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories/ai`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories/design`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories/development`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Ajoute ici d'autres routes importantes si besoin (about, contact, etc.)
  ];
}
