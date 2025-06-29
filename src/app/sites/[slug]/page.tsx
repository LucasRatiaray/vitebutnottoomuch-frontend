import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  ExternalLink, 
  Clock, 
  Star, 
  Gauge, 
  Code, 
  Palette,
  ArrowLeft 
} from 'lucide-react';
import { getAllSites, getSiteBySlug, getSimilarSites } from '@/lib/data';
import SiteCard from '@/components/site-card';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const sites = await getAllSites();
  return sites.map((site) => ({
    slug: site.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await getSiteBySlug(params.slug);
  
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
      images: site.siteInfo.logo ? [
        {
          url: site.siteInfo.logo,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ] : [],
    },
  };
}

export default async function SiteDetailPage({ params }: Props) {
  const site = await getSiteBySlug(params.slug);
  
  if (!site) {
    notFound();
  }

  const similarSites = await getSimilarSites(site);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/sites">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux sites
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {site.siteInfo.favicon && (
                <Image
                  src={site.siteInfo.favicon}
                  alt={`${site.siteInfo.domain} favicon`}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{site.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <span>{site.siteInfo.domain}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{site.seo.readingTime} min de lecture</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold">{site.seo.vitebutnottoomuchScore}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
                <p className="text-sm text-muted-foreground">Score Vitebutnottoomuch</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {site.seo.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <a href={site.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visiter le site
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          {site.siteInfo.logo && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={site.siteInfo.logo}
                alt={site.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {site.content.introduction}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {site.content.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              {site.content.conclusion}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Site Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Statistiques</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  <span className="text-sm">Temps de chargement</span>
                </div>
                <span className="font-medium">{site.siteInfo.performance.loadTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">First Paint</span>
                </div>
                <span className="font-medium">{site.siteInfo.performance.firstPaint}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Nombre de mots</span>
                <span className="font-medium">{site.seo.wordCount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Technologies</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {site.siteInfo.technologies.frameworks.frontend.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4" />
                    <span className="text-sm font-medium">Frontend</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {site.siteInfo.technologies.frameworks.frontend.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {site.siteInfo.technologies.frameworks.backend.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-4 w-4" />
                    <span className="text-sm font-medium">Backend</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {site.siteInfo.technologies.frameworks.backend.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Tags</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {site.seo.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Sites */}
      {similarSites.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Sites similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarSites.map((similarSite) => (
              <SiteCard key={similarSite.id} site={similarSite} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}