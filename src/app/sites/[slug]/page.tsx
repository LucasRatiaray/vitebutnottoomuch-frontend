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
  Code2,
  ArrowLeft,
  BookOpen,
  Calendar,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { getAllSlugs, getSiteBySlugSync } from '@/lib/data';
import { ScoreBadge } from '@/components/ui/score-badge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteBySlugSync(slug);

  if (!site) {
    return {
      title: 'Site non trouvé',
    };
  }

  return {
    title: site.title,
    description: site.metaDescription,
    keywords: [
      ...site.seo.keywords,
      'vitebutnottoomuch',
      'analyse',
      'performance',
    ],
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
      images: site.siteInfo.logo
        ? [
            {
              url: site.siteInfo.logo,
              width: 1200,
              height: 630,
              alt: site.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.title,
      description: site.metaDescription,
      images: site.siteInfo.logo ? [site.siteInfo.logo] : [],
    },
  };
}

export default async function SiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = getSiteBySlugSync(slug);

  if (!site) {
    notFound();
  }

  // Table des matières
  const tableOfContents = site.content.sections.map((section, index) => ({
    id: `section-${index}`,
    title: section.title,
    href: `#section-${index}`,
  }));

  // Vérifier si il y a des technologies à afficher
  const hasTechnologies =
    (site.siteInfo.technologies.frameworks?.frontend &&
      site.siteInfo.technologies.frameworks.frontend.length > 0) ||
    (site.siteInfo.technologies.frameworks?.backend &&
      site.siteInfo.technologies.frameworks.backend.length > 0) ||
    (site.siteInfo.technologies.analytics &&
      site.siteInfo.technologies.analytics.length > 0);

  return (
    <article className="">
      {/* Navigation */}
      <nav className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/sites">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux sites
          </Link>
        </Button>
      </nav>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-6 flex items-start gap-6">
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
              <div className="min-w-0 flex-1">
                <h1 className="mb-4 text-4xl leading-tight font-bold">
                  {site.title}
                </h1>
                <p className="text-muted-foreground mb-6 text-xl leading-relaxed">
                  {site.metaDescription}
                </p>

                {/* Méta informations */}
                <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{site.siteInfo.domain}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{site.seo.readingTime} min de lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(site.enrichedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                {/* Score et CTA */}
                <div className="flex items-center gap-4">
                  <ScoreBadge
                    score={site.seo.vitebutnottoomuchScore}
                    className="px-4 py-2 text-lg"
                  />
                  <Button asChild size="lg">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                  <Badge
                    key={category}
                    variant="secondary"
                    className="px-3 py-1"
                  >
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
              <div className="from-primary/5 to-primary/10 aspect-video overflow-hidden rounded-xl bg-gradient-to-br">
                <Image
                  src={site.siteInfo.logo}
                  alt={`Aperçu de ${site.siteInfo.domain}`}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="first-letter:text-primary text-lg leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold">
                {site.content.introduction}
              </p>
            </div>
          </section>

          <Separator className="my-12" />

          {/* Content Sections */}
          <div className="space-y-12">
            {site.content.sections.map((section, index) => (
              <section key={index} id={`section-${index}`}>
                <h2 className="text-primary mb-6 text-3xl font-bold">
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed">{section.content}</p>
                </div>
                {index < site.content.sections.length - 1 && (
                  <Separator className="mt-12" />
                )}
              </section>
            ))}
          </div>

          {/* <Separator className="my-12" /> */}

          {/* Conclusion */}
          {/* <section id="conclusion" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
              <p className="text-lg leading-relaxed">
                {site.content.conclusion}
              </p>
            </div>
          </section> */}

          {/* CTA Final */}
          <div className="border-t py-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Découvrez {site.siteInfo.domain}
            </h3>
            <p className="text-muted-foreground mb-6">
              Explorez ce site qui incarne parfaitement la philosophie
              Vitebutnottoomuch
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
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Table des matières */}
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 font-semibold">
                <BookOpen className="h-4 w-4" />
                Table des matières
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {tableOfContents.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary block py-1 text-sm transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Score Vitebutnottoomuch */}
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 font-semibold">
                <TrendingUp className="h-4 w-4" />
                Score Vitebutnottoomuch
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-primary mb-4 text-4xl font-bold">
                {site.seo.vitebutnottoomuchScore.toFixed(1)}
                <span className="text-muted-foreground ml-2 text-lg">/ 10</span>
              </div>
              <p className="text-muted-foreground text-xs">
                Équilibre parfait entre performance et fonctionnalités
              </p>
            </CardContent>
          </Card>

          {/* Technologies */}
          {hasTechnologies && (
            <Card>
              <CardHeader>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Code2 className="h-4 w-4" />
                  Technologies
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {site.siteInfo.technologies.frameworks?.frontend &&
                  site.siteInfo.technologies.frameworks.frontend.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-medium">Frontend</div>
                      <div className="flex flex-wrap gap-1">
                        {site.siteInfo.technologies.frameworks.frontend.map(
                          (tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {site.siteInfo.technologies.frameworks?.backend &&
                  site.siteInfo.technologies.frameworks.backend.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-medium">Backend</div>
                      <div className="flex flex-wrap gap-1">
                        {site.siteInfo.technologies.frameworks.backend.map(
                          (tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {site.siteInfo.technologies.analytics &&
                  site.siteInfo.technologies.analytics.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-medium">Analytics</div>
                      <div className="flex flex-wrap gap-1">
                        {site.siteInfo.technologies.analytics.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      {/* Similar Sites */}
      {/* {similarSites && similarSites.length > 0 && (
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
      )} */}
    </article>
  );
}
