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
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <BreadcrumbItem />
          <h1 className="text-3xl font-bold mt-4 mb-2">Sites Web Vitebutnottoomuch</h1>
          <p className="text-muted-foreground">
            Découvrez notre sélection de sites web analysés pour leur équilibre parfait 
            entre vitesse et fonctionnalités.
          </p>
        </div>
        <Select defaultValue="score">
          <SelectTrigger className="w-[200px]">
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

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}