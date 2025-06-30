import type { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laravel.com',
      },
      {
        protocol: 'https',
        hostname: 'react.dev',
      },
      {
        protocol: 'https',
        hostname: 'vuejs.org',
      },
      {
        protocol: 'https',
        hostname: 'nextjs.org',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
      {
        protocol: 'https',
        hostname: 'stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'figma.com',
      },
      // Permettre tous les domaines sécurisés pour les favicons
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
