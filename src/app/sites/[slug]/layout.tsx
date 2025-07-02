'use client';

import * as React from 'react';
import BreadcrumbItem from '@/components/breadcrumbs-item';

interface Props {
  children: React.ReactNode;
}

export default function SlugLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mb-6">
        <BreadcrumbItem />
      </div>

      {children}
    </div>
  );
}
