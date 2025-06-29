// src/components/breadcrumbs-item.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  ChevronsRight,
  Home as HomeIcon,
  Archive as BookmarksIcon,
  Folder as DefaultIcon,
} from 'lucide-react';
import Head from 'next/head';
import { CATEGORY_MAP } from '@/lib/categories';

const STATIC_SEGMENTS: Record<
  string,
  { label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
> = {
  '': { label: 'Accueil', Icon: HomeIcon },
  sites: { label: 'Sites', Icon: BookmarksIcon },
  categories: { label: 'Catégories', Icon: DefaultIcon },
};

function humanize(seg: string) {
  return seg
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

export default function BreadcrumbsItem() {
  const pathname = usePathname();
  const raw = pathname
    .split('/')
    .filter(Boolean)
    .filter((s) => s !== 'categories');
  const segments = [''].concat(raw);

  const crumbs = segments.map((seg, idx) => {
    const isLast = idx === segments.length - 1;
    const href = idx === 0 ? '/' : '/' + segments.slice(1, idx + 1).join('/');

    let label: string;
    let Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

    if (seg in STATIC_SEGMENTS) {
      ({ label, Icon } = STATIC_SEGMENTS[seg]);
    } else if (seg in CATEGORY_MAP) {
      const cat = CATEGORY_MAP[seg];
      label = cat.title;
      Icon = cat.icon;
    } else {
      label = humanize(seg);
      Icon = DefaultIcon;
    }

    return { href, label, Icon, isLast };
  });

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.label,
      item: `https://vitebutnottoomuch.me${crumb.href}`,
    })),
  };

  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  </Head>;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map(({ href, label, Icon, isLast }) => (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              {isLast ? (
                <div className="flex items-center">
                  <Icon className="mr-1 inline h-4 w-4" />
                  {label}
                </div>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href} className="flex items-center">
                    <Icon className="mr-1 inline h-4 w-4" />
                    {label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && (
              <BreadcrumbSeparator>
                <ChevronsRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
