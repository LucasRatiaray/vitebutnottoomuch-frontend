// src/app/bookmarks/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import CardPost from '@/components/card-post';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const canonical = `/bookmarks/categories/${params.slug}`;

  return {
    title: `Bookmarks - ${params.slug}`,
    description: `Liste des bookmarks pour la catégorie ${params.slug}`,
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
        // Ajoutez d'autres langues si nécessaire
      },
    },
    openGraph: {
      url: canonical,
      title: `Bookmarks - ${params.slug}`,
      description: `Liste des bookmarks pour la catégorie ${params.slug}`,
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
}

interface Props {
  params: { slug: string };
  // searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const postsForCategory = Array(2).fill(null);

  return (
    <>
      {postsForCategory.map((_, i) => (
        <CardPost key={i} />
      ))}
    </>
  );
}
