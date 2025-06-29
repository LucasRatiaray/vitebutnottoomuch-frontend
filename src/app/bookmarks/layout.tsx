// File: src/app/bookmarks/layout.tsx
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

export default function BookmarksLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="flex justify-between">
        <BreadcrumbItem />
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}
