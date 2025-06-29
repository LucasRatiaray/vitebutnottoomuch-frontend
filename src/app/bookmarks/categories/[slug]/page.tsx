import type { Metadata } from 'next';
import CardPost from '@/components/card-post';

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */
type CategoryPageProps = {
  params: {
    slug: string;
  };
};

/* -------------------------------------------------------------------------- */
/*                               SEO : metadata                               */
/* -------------------------------------------------------------------------- */
export function generateMetadata({ params }: CategoryPageProps): Metadata {
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

/* -------------------------------------------------------------------------- */
/*                               Page component                               */
/* -------------------------------------------------------------------------- */
export default function CategoryPage({ params }: CategoryPageProps) {
  // on récupère le slug pour l'utiliser (évite no-unused-vars)
  const { slug } = params;

  // Remplace ce placeholder par tes vraies données
  const postsForCategory = Array(2).fill(null);

  return (
    <>
      {/* Titre caché pour l’accessibilité & SEO */}
      <h1 className="sr-only">Bookmarks pour la catégorie {slug}</h1>

      <section className="grid gap-6 md:grid-cols-2">
        {postsForCategory.map((_, i) => (
          <CardPost key={i} />
        ))}
      </section>
    </>
  );
}
