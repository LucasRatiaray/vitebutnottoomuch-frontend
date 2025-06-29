import type { Metadata } from 'next';
import CardPost from '@/components/card-post';

/* ---------- SEO ---------- */
export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Liste de tous les bookmarks.',
  alternates: {
    canonical: '/bookmarks',
    languages: {
      'fr-FR': '/bookmarks',
    },
  },
  openGraph: {
    url: '/bookmarks',
    title: 'Bookmarks',
    description: 'Liste de tous les bookmarks.',
    type: 'website',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'vitebutnottoomuch – bannière',
      },
    ],
  },
};
/* ------------------------- */

export default function BookmarksPage() {
  const posts = Array(6).fill(null); // remplacez par vos vraies données

  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((_, i) => (
        <CardPost key={i} />
      ))}
    </section>
  );
}
