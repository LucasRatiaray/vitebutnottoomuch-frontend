// File: src/components/site-card.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRight, ExternalLink, Clock, Gauge, Code2 } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Site } from '@/lib/types';
import { ScoreBadge } from '@/components/score-badge';

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  // Récupérer les technologies principales
  const getTechBadges = () => {
    const techs = [];
    if (site.siteInfo.technologies.frameworks?.frontend) {
      techs.push(...site.siteInfo.technologies.frameworks.frontend.slice(0, 2));
    }
    if (site.siteInfo.technologies.frameworks?.backend) {
      techs.push(...site.siteInfo.technologies.frameworks.backend.slice(0, 1));
    }
    return techs.slice(0, 3);
  };

  return (
    <Card className="group flex h-full flex-col gap-4 px-3 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] sm:px-4">
      <CardHeader className="flex-row items-start justify-between px-0 pb-3 sm:pb-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-12 sm:w-12">
            {site.siteInfo.favicon ? (
              <Image
                src={site.siteInfo.favicon}
                alt={`${site.siteInfo.domain} favicon`}
                width={32}
                height={32}
                className="rounded"
              />
            ) : (
              <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="group-hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg">
              {
                site.title
                  .replace(/^[\w.-]+ - /, '')
                  .split(' Vitebutnottoomuch')[0]
              }
            </h3>
            <p className="text-muted-foreground truncate text-xs sm:text-sm">
              {site.siteInfo.domain}
            </p>
          </div>
        </div>
        <ScoreBadge
          score={site.seo.vitebutnottoomuchScore}
          className="shrink-0 scale-90 sm:scale-100"
        />
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-1 flex-col gap-3 px-0 sm:gap-4">
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
          {site.siteInfo.logo ? (
            <Image
              src={site.siteInfo.logo}
              alt={`${site.siteInfo.domain} preview`}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="from-primary/5 to-primary/10 flex h-full items-center justify-center bg-gradient-to-br">
              <ExternalLink className="text-muted-foreground/50 h-8 w-8 sm:h-12 sm:w-12" />
            </div>
          )}
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed sm:text-sm">
          {site.metaDescription}
        </p>

        {/* Technologies */}
        {getTechBadges().length > 0 && (
          <div className="flex items-center gap-2">
            <Code2 className="text-muted-foreground h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
            <div className="flex min-w-0 flex-wrap gap-1">
              {getTechBadges().map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="truncate text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {site.seo.categories.slice(0, 2).map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="truncate text-xs"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 shrink-0" />
            <span className="truncate">{site.seo.readingTime} min</span>
          </div>
          {site.siteInfo.performance?.loadTime && (
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {site.siteInfo.performance.loadTime}ms
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-0 pt-2 sm:pt-0">
        <Button
          asChild
          className="group/btn flex-1 text-xs sm:text-sm"
          size="sm"
        >
          <Link href={`/sites/${site.slug}`}>
            <span className="hidden sm:inline">Voir l&apos;analyse</span>
            <span className="sm:hidden">Analyse</span>
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1 sm:ml-2 sm:h-4 sm:w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Visiter le site"
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
