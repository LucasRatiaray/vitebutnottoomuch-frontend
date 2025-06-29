// src/app/bookmarks/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import CardPost from '@/components/card-post';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `/bookmarks/categories/${slug}`;

  return {
    title: `Bookmarks – ${slug}`,
    description: `Liste des bookmarks pour la catégorie ${slug}.`,
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
        'en-US': `/en${canonical}`,
      },
    },
    openGraph: {
      url: canonical,
      title: `Bookmarks – ${slug}`,
      description: `Liste des bookmarks pour la catégorie ${slug}.`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postsForCategory = Array(2).fill(null);

  return (
    <>
      <h1 className="sr-only">Bookmarks pour la catégorie {slug}</h1>
      <section className="grid gap-6 md:grid-cols-2">
        {postsForCategory.map((_, i) => (
          <CardPost key={i} />
        ))}
      </section>
    </>
  );
}
