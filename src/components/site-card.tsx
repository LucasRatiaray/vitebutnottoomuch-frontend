// File: src/components/site-card.tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRight, ExternalLink, Clock, Star } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Site } from '@/lib/types';

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <Card className="gap-4 px-4 hover:shadow-lg transition-shadow">
      <CardHeader className="flex-row items-center gap-3 px-0 font-semibold">
        <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full overflow-hidden">
          {site.siteInfo.favicon ? (
            <Image
              src={site.siteInfo.favicon}
              alt={`${site.siteInfo.domain} favicon`}
              width={24}
              height={24}
              className="rounded"
            />
          ) : (
            <ExternalLink className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold line-clamp-1">{site.title}</h3>
          <p className="text-sm text-muted-foreground">{site.siteInfo.domain}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{site.seo.vitebutnottoomuchScore}</span>
        </div>
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-col gap-3 px-0">
        <div className="bg-muted aspect-video w-full rounded-xl relative overflow-hidden">
          {site.siteInfo.logo ? (
            <Image
              src={site.siteInfo.logo}
              alt={`${site.siteInfo.domain} preview`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ExternalLink className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <p className="text-sm line-clamp-3">
          {site.metaDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {site.seo.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{site.seo.readingTime} min</span>
          </div>
          <div>
            {site.seo.wordCount.toLocaleString()} mots
          </div>
          <div>
            {site.siteInfo.performance.loadTime}ms
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0 flex gap-2">
        <Button asChild className="group flex-1">
          <Link href={`/sites/${site.slug}`}>
            Voir l'analyse
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
