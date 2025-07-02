// src/app/HomeClient.tsx
'use client';

import * as React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Star,
  BarChart3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SiteCard from '@/components/ui/site-card';
import { CategoriesFeatureSection } from '@/components/ui/categories-feature-section';
import { stats, getTopSitesSync, getRecentSitesSync } from '@/lib/data';

const defaultProps = {
  badge: 'Catalogue Vitebutnottoomuch',
  heading: 'Vitebutnottoomuch - Le Catalogue de la Performance Web Équilibrée',
  description:
    "Découvrez notre sélection exclusive de sites web analysés sous l'angle Vitebutnottoomuch. Chaque site est évalué pour son équilibre parfait entre vitesse et fonctionnalités, incarnant la philosophie de performance optimale.",
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

  // Préparer les données des catégories pour le nouveau composant
  const categoriesData = stats.categories.slice(0, 8).map((category) => ({
    title: category,
    description: `Découvrez les meilleurs sites de ${category.toLowerCase()} analysés selon les critères Vitebutnottoomuch.`,
    href: `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    count: undefined, // On pourrait ajouter le nombre de sites par catégorie plus tard
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-screen items-center py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6 text-center sm:space-y-8 lg:space-y-10">
            {badge && (
              <Badge className="bg-primary/5 text-primary hover:bg-primary/5 text-xs shadow-none sm:text-sm">
                {badge}
                <ArrowUpRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Badge>
            )}
            <h1 className="font-unbounded max-w-4xl text-pretty text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground max-w-2xl px-4 text-sm leading-relaxed sm:text-base lg:text-lg">
              {description}
            </p>

            {/* Stats Section */}
            <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 px-4 sm:mt-10 sm:gap-8 md:grid-cols-3 lg:mt-12">
              <div className="bg-background/50 rounded-lg border p-4 text-center backdrop-blur-sm sm:p-6">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <BarChart3 className="text-primary h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">
                    {stats.total}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                  Sites analysés
                </p>
              </div>
              <div className="bg-background/50 rounded-lg border p-4 text-center backdrop-blur-sm sm:p-6">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <Star className="h-6 w-6 fill-current text-yellow-500 sm:h-7 sm:w-7" />
                  <span className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">
                    {stats.avgVitebutnottoomuchScore.toFixed(1)}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                  Score moyen
                </p>
              </div>
              <div className="bg-background/50 rounded-lg border p-4 text-center backdrop-blur-sm sm:p-6 md:col-span-1">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-500 sm:h-7 sm:w-7" />
                  <span className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">
                    {stats.categories.length}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                  Catégories
                </p>
              </div>
            </div>

            <div className="flex w-full max-w-md flex-col justify-center gap-3 pt-6 sm:max-w-lg sm:flex-row sm:gap-4">
              {buttons.primary && (
                <Button
                  asChild
                  className="w-full sm:w-auto sm:flex-1"
                  size="lg"
                >
                  <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  variant="outline"
                  asChild
                  className="group w-full sm:w-auto sm:flex-1"
                  size="lg"
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
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
              Sites les mieux notés Vitebutnottoomuch
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl px-4 text-sm leading-relaxed sm:text-base lg:text-lg">
              Découvrez les sites qui incarnent le mieux la philosophie
              vitebutnottoomuch : performance exceptionnelle et richesse
              fonctionnelle en parfait équilibre.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {topSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/sites">
                Voir tous les sites
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
              Explorez par catégories
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl px-4 text-sm leading-relaxed sm:text-base lg:text-lg">
              Parcourez notre catalogue organisé par domaines d&apos;expertise.
              Chaque catégorie regroupe les meilleurs sites de son secteur.
            </p>
          </div>
          <CategoriesFeatureSection categories={categoriesData} />
          <div className="mt-8 text-center sm:mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/categories">
                Toutes les catégories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Sites Section */}
      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
              Dernières analyses Vitebutnottoomuch
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl px-4 text-sm leading-relaxed sm:text-base lg:text-lg">
              Les sites les plus récemment ajoutés à notre catalogue, avec leurs
              analyses complètes et scores de performance.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recentSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
