import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Clock, 
  Gauge, 
  Code2, 
  ArrowLeft,
  BookOpen,
  Calendar,
  TrendingUp,
  Globe
} from 'lucide-react';
import { getAllSlugs, getSiteBySlugSync, getSimilarSites } from '@/lib/data';
import SiteCard from '@/components/site-card';
import { ScoreBadge } from '@/components/score-badge';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = getSiteBySlugSync(params.slug);
  
  if (!site) {
    return {
      title: 'Site non trouvé',
    };
  }

  return {
    title: site.title,
    description: site.metaDescription,
    keywords: [...site.seo.keywords, 'vitebutnottoomuch', 'analyse', 'performance'],
    alternates: {
      canonical: `/sites/${site.slug}`,
    },
    openGraph: {
      title: site.title,
      description: site.metaDescription,
      url: `/sites/${site.slug}`,
      type: 'article',
      publishedTime: site.enrichedAt,
      modifiedTime: site.lastModified || site.enrichedAt,
      authors: ['Vitebutnottoomuch'],
      section: 'Technology',
      tags: site.seo.tags,
      images: site.siteInfo.logo ? [
        {
          url: site.siteInfo.logo,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.title,
      description: site.metaDescription,
      images: site.siteInfo.logo ? [site.siteInfo.logo] : [],
    },
  };
}

export default function SiteDetailPage({ params }: Props) {
  const site = getSiteBySlugSync(params.slug);
  
  if (!site) {
    notFound();
  }

  const similarSites = getSimilarSites(site, 3);

  // Table des matières
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', href: '#introduction' },
    ...site.content.sections.map((section, index) => ({
      id: `section-${index}`,
      title: section.title,
      href: `#section-${index}`
    })),
    { id: 'conclusion', title: 'Conclusion', href: '#conclusion' }
  ];

  return (
    <article className="mx-auto max-w-7xl px-6 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/sites">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux sites
          </Link>
        </Button>
      </nav>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              {site.siteInfo.favicon && (
                <div className="shrink-0">
                  <Image
                    src={site.siteInfo.favicon}
                    alt={`${site.siteInfo.domain} favicon`}
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {site.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {site.metaDescription}
                </p>
                
                {/* Méta informations */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{site.siteInfo.domain}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{site.seo.readingTime} min de lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{site.seo.wordCount.toLocaleString()} mots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(site.enrichedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Score et CTA */}
                <div className="flex items-center gap-4">
                  <ScoreBadge score={site.seo.vitebutnottoomuchScore} className="text-lg px-4 py-2" />
                  <Button asChild size="lg">
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visiter le site
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Catégories et tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {site.seo.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {site.seo.tags.slice(0, 8).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* Hero Image */}
          {site.siteInfo.logo && (
            <div className="mb-12">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <Image
                  src={site.siteInfo.logo}
                  alt={`Aperçu de ${site.siteInfo.domain}`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                {site.content.introduction}
              </p>
            </div>
          </section>

          <Separator className="my-12" />

          {/* Content Sections */}
          <div className="space-y-12">
            {site.content.sections.map((section, index) => (
              <section key={index} id={`section-${index}`}>
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed">
                    {section.content}
                  </p>
                </div>
                {index < site.content.sections.length - 1 && (
                  <Separator className="mt-12" />
                )}
              </section>
            ))}
          </div>

          <Separator className="my-12" />

          {/* Conclusion */}
          <section id="conclusion" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
              <p className="text-lg leading-relaxed">
                {site.content.conclusion}
              </p>
            </div>
          </section>

          {/* CTA Final */}
          <div className="text-center py-8 border-t">
            <h3 className="text-2xl font-bold mb-4">Découvrez {site.siteInfo.domain}</h3>
            <p className="text-muted-foreground mb-6">
              Explorez ce site qui incarne parfaitement la philosophie Vitebutnottoomuch
            </p>
            <Button asChild size="lg">
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visiter {site.siteInfo.domain}
              </a>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-8 lg:self-start space-y-6">
          {/* Table des matières */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Table des matières
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {item.title}
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Score Vitebutnottoomuch */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Score Vitebutnottoomuch
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {site.seo.vitebutnottoomuchScore.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mb-4">/ 10</div>
              <p className="text-xs text-muted-foreground">
                Équilibre parfait entre performance et fonctionnalités
              </p>
            </CardContent>
          </Card>

          {/* Statistiques de performance */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Performance
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {site.siteInfo.performance?.loadTime && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temps de chargement</span>
                  <span className="font-medium">{site.siteInfo.performance.loadTime}ms</span>
                </div>
              )}
              {site.siteInfo.performance?.firstPaint && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">First Paint</span>
                  <span className="font-medium">{site.siteInfo.performance.firstPaint}ms</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm">Mots analysés</span>
                <span className="font-medium">{site.seo.wordCount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Technologies
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {site.siteInfo.technologies.frameworks?.frontend && site.siteInfo.technologies.frameworks.frontend.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Frontend</div>
                  <div className="flex flex-wrap gap-1">
                    {site.siteInfo.technologies.frameworks.frontend.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {site.siteInfo.technologies.frameworks?.backend && site.siteInfo.technologies.frameworks.backend.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Backend</div>
                  <div className="flex flex-wrap gap-1">
                    {site.siteInfo.technologies.frameworks.backend.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {site.siteInfo.technologies.analytics && site.siteInfo.technologies.analytics.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Analytics</div>
                  <div className="flex flex-wrap gap-1">
                    {site.siteInfo.technologies.analytics.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Similar Sites */}
      {similarSites && similarSites.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Sites similaires avec un excellent score Vitebutnottoomuch
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarSites.map((similarSite) => (
              <SiteCard key={similarSite.id} site={similarSite} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}