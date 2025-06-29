import type { Metadata } from 'next';
import CardPost from '@/components/card-post';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const canonical = `/bookmarks/categories/${params.slug}`;

  return {
    title: `Bookmarks – ${params.slug}`,
    description: `Liste des bookmarks pour la catégorie ${params.slug}.`,
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
        'en-US': `/en${canonical}`,
      },
    },
    openGraph: {
      url: canonical,
      title: `Bookmarks – ${params.slug}`,
      description: `Liste des bookmarks pour la catégorie ${params.slug}.`,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
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
