// src/app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'vitebutnottoomuch',
    short_name: 'vitebutnottoomuch',
    description:
      'Une collection organisée de sites web incontournables et inspirants.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6c5dd3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/milky-way-night-sky-stars.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: "maskable",
      },
    ],
    lang: 'fr',
    orientation: 'portrait',
    scope: '/',
  };
}
