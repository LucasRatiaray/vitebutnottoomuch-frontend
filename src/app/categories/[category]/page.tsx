import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteCard from '@/components/ui/site-card';
import { Badge } from '@/components/ui/badge';
import { getSitesByCategory } from '@/lib/data';
import { categoriesItems, CATEGORY_MAP } from '@/lib/categories';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categoriesItems.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = CATEGORY_MAP[category];

  if (!categoryInfo) {
    return {
      title: 'Catégorie non trouvée',
    };
  }

  return {
    title: `${categoryInfo.title} Vitebutnottoomuch`,
    description: `Découvrez les meilleurs sites web de la catégorie ${categoryInfo.title} analysés selon les critères Vitebutnottoomuch. ${categoryInfo.description}`,
    keywords: [
      'vitebutnottoomuch',
      categoryInfo.title.toLowerCase(),
      'sites web',
      'performance',
      'analyse',
    ],
    alternates: {
      canonical: `/categories/${category}`,
    },
    openGraph: {
      title: `${categoryInfo.title} | Vitebutnottoomuch`,
      description: `Sites web ${categoryInfo.title} analysés selon les critères Vitebutnottoomuch.`,
      url: `/categories/${category}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryInfo = CATEGORY_MAP[category];

  if (!categoryInfo) {
    notFound();
  }

  const sites = await getSitesByCategory(category);
  const avgScore =
    sites.reduce((acc, site) => acc + site.seo.vitebutnottoomuchScore, 0) /
      sites.length || 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-xl">
            <categoryInfo.icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              {categoryInfo.title} Vitebutnottoomuch
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <Badge variant="secondary">{sites.length} sites</Badge>
              {avgScore > 0 && (
                <Badge variant="outline">
                  ⭐ Score moyen : {avgScore.toFixed(1)}/10
                </Badge>
              )}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-3xl text-xl">
          {categoryInfo.description} Découvrez notre sélection des meilleurs
          sites de cette catégorie, tous analysés selon les critères
          Vitebutnottoomuch pour un équilibre parfait entre performance et
          fonctionnalités.
        </p>
      </div>

      {sites.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <categoryInfo.icon className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h3 className="mb-2 text-xl font-semibold">
            Aucun site dans cette catégorie
          </h3>
          <p className="text-muted-foreground">
            Les sites de la catégorie {categoryInfo.title} seront bientôt
            ajoutés à notre catalogue Vitebutnottoomuch.
          </p>
        </div>
      )}
    </div>
  );
}
