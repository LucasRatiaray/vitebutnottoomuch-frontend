import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categoriesItems } from '@/lib/categories';
import { getSitesByCategory, getStats } from '@/lib/data';

export const generateMetadata = (): Metadata => ({
  title: 'Catégories',
  description: 'Explorez les sites web Vitebutnottoomuch par catégories : E-commerce, SaaS, Design, Développement et plus encore. Chaque catégorie regroupe les meilleurs sites analysés.',
  keywords: ['vitebutnottoomuch', 'catégories', 'e-commerce', 'saas', 'design', 'développement'],
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Catégories | Vitebutnottoomuch',
    description: 'Explorez les sites web par catégories dans notre catalogue Vitebutnottoomuch.',
    url: '/categories',
    type: 'website',
  },
});

export default async function CategoriesPage() {
  const stats = await getStats();

  const categoriesWithCounts = await Promise.all(
    categoriesItems.map(async (category) => {
      const sites = await getSitesByCategory(category.slug);
      return {
        ...category,
        count: sites.length,
        avgScore: sites.reduce((acc, site) => acc + site.seo.vitebutnottoomuchScore, 0) / sites.length || 0,
      };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Catégories Vitebutnottoomuch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explorez notre catalogue de sites web organisé par catégories. 
          Chaque catégorie regroupe les sites les plus performants selon les critères Vitebutnottoomuch.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoriesWithCounts.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-lg">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{category.count} sites</Badge>
                      {category.avgScore > 0 && (
                        <Badge variant="outline">
                          ⭐ {category.avgScore.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-muted/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Statistiques du catalogue</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Sites analysés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.categories.length}</div>
            <div className="text-sm text-muted-foreground">Catégories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{stats.avgVitebutnottoomuchScore.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Score moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}