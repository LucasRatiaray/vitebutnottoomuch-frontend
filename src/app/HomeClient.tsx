// src/app/HomeClient.tsx
'use client';

import * as React from 'react';
import { ArrowRight, ArrowUpRight, TrendingUp, Star, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import SiteCard from '@/components/site-card';
import { stats, getTopSitesSync, getRecentSitesSync } from '@/lib/data';

const defaultProps = {
  badge: 'Catalogue Vitebutnottoomuch',
  heading: 'Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée',
  description:
    'Découvrez notre sélection exclusive de sites web analysés sous l\'angle Vitebutnottoomuch. Chaque site est évalué pour son équilibre parfait entre vitesse et fonctionnalités, incarnant la philosophie de performance optimale.',
  buttons: {
    primary: {
      text: 'Explorer les Sites',
      url: '/sites',
    },
    secondary: {
      text: 'Voir les Catégories',
      url: '/categories',
    },
  },
};

export default function HomeClient({
  badge = defaultProps.badge,
  heading = defaultProps.heading,
  description = defaultProps.description,
  buttons = defaultProps.buttons,
}) {
  const topSites = getTopSitesSync(3);
  const recentSites = getRecentSitesSync(3);

  return (
    <>
      {/* Hero Section */}
      <section className="h-full py-8 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center gap-2 text-center xl:gap-4">
            {badge && (
              <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                {badge}
                <ArrowUpRight />
              </Badge>
            )}
            <h1 className="font-unbounded max-w-2xl text-4xl font-semibold text-pretty">
              {heading}
            </h1>
            <p className="text-muted-foreground max-w-xl text-base">
              {description}
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{stats.total}</span>
                </div>
                <p className="text-sm text-muted-foreground">Sites analysés</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-primary">{stats.avgVitebutnottoomuchScore.toFixed(1)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Score moyen</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold text-primary">{stats.categories.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Catégories</p>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center gap-2 pt-6 sm:flex-row">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  variant="outline"
                  asChild
                  className="group w-full sm:w-auto"
                >
                  <Link href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Sites Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Sites les mieux notés Vitebutnottoomuch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les sites qui incarnent le mieux la philosophie vitebutnottoomuch : 
              performance exceptionnelle et richesse fonctionnelle en parfait équilibre.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/sites">
                Voir tous les sites
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Explorez par catégories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Parcourez notre catalogue organisé par domaines d'expertise. 
              Chaque catégorie regroupe les meilleurs sites de son secteur.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.categories.slice(0, 6).map((category, index) => (
              <Link key={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold">{category}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Découvrez les meilleurs sites de {category.toLowerCase()} 
                      analysés selon les critères Vitebutnottoomuch.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">
                Toutes les catégories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Sites Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Dernières analyses Vitebutnottoomuch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les sites les plus récemment ajoutés à notre catalogue, 
              avec leurs analyses complètes et scores de performance.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
