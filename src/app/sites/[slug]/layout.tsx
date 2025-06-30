'use client';

import * as React from 'react';
import BreadcrumbItem from '@/components/breadcrumbs-item';

interface Props {
  children: React.ReactNode;
}

export default function SlugLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="mb-8">
        <BreadcrumbItem />
      </div>

      {children}
    </div>
  );
}
