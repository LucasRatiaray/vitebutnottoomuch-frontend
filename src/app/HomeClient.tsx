// src/app/HomeClient.tsx
'use client';

import * as React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  return (
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
          <div className="flex w-full flex-col justify-center gap-2 pt-2 sm:flex-row">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
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
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
