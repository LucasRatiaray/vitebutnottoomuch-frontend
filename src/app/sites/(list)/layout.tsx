'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import BreadcrumbItem from '@/components/breadcrumbs-item';

interface Props {
  children: React.ReactNode;
}

export default function SitesLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mb-8 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1">
          <BreadcrumbItem />
          <h1 className="mt-3 mb-2 text-2xl font-bold sm:mt-4 sm:mb-3 sm:text-3xl lg:text-4xl">
            Sites Web Vitebutnottoomuch
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base lg:text-lg">
            Découvrez notre sélection de sites web analysés pour leur équilibre
            parfait entre vitesse et fonctionnalités.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Select defaultValue="score">
            <SelectTrigger className="w-full sm:w-[200px] lg:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Score Vitebutnottoomuch</SelectItem>
              <SelectItem value="latest">Plus récents</SelectItem>
              <SelectItem value="popular">Plus populaires</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {children}
    </div>
  );
}
