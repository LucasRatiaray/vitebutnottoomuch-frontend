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
    <Card className="group gap-4 px-4 transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex-row items-start justify-between px-0 pb-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            {site.siteInfo.favicon ? (
              <Image
                src={site.siteInfo.favicon}
                alt={`${site.siteInfo.domain} favicon`}
                width={32}
                height={32}
                className="rounded"
              />
            ) : (
              <ExternalLink className="h-6 w-6" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
              {
                site.title
                  .replace(/^[\w.-]+ - /, '')
                  .split(' Vitebutnottoomuch')[0]
              }
            </h3>
            <p className="text-muted-foreground text-sm">
              {site.siteInfo.domain}
            </p>
          </div>
        </div>
        <ScoreBadge
          score={site.seo.vitebutnottoomuchScore}
          className="shrink-0"
        />
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-col gap-4 px-0">
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
              <ExternalLink className="text-muted-foreground/50 h-12 w-12" />
            </div>
          )}
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed">
          {site.metaDescription}
        </p>

        {/* Technologies */}
        {getTechBadges().length > 0 && (
          <div className="flex items-center gap-2">
            <Code2 className="text-muted-foreground h-4 w-4" />
            <div className="flex flex-wrap gap-1">
              {getTechBadges().map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {site.seo.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        {/* Meta info */}
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{site.seo.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{site.seo.wordCount.toLocaleString()} mots</span>
          </div>
          {site.siteInfo.performance?.loadTime && (
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3" />
              <span>{site.siteInfo.performance.loadTime}ms</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-0">
        <Button asChild className="group/btn flex-1">
          <Link href={`/sites/${site.slug}`}>
            Voir l&apos;analyse
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Visiter le site"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
