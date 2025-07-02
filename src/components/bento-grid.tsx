'use client';

import { cn } from '@/lib/utils';
import {
  CheckCircle,
  TrendingUp,
  Video,
  Globe,
  ExternalLink,
  Clock,
  ArrowRight,
  Code2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScoreBadge } from '@/components/score-badge';
import type { BentoItem } from '@/lib/bento-utils';

interface BentoGridProps {
  items: BentoItem[];
}

// Helper function to get icon component from string
function getIconComponent(iconName?: string) {
  switch (iconName) {
    case 'external-link':
      return (
        <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      );
    case 'trending-up':
      return <TrendingUp className="h-4 w-4 text-blue-500" />;
    case 'check-circle':
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case 'video':
      return <Video className="h-4 w-4 text-purple-500" />;
    case 'globe':
      return <Globe className="h-4 w-4 text-sky-500" />;
    default:
      return (
        <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      );
  }
}

const itemsSample: BentoItem[] = [
  {
    title: 'Analytics Dashboard',
    meta: 'v2.4.1',
    description:
      'Real-time metrics with AI-powered insights and predictive analytics',
    icon: 'trending-up',
    status: 'Live',
    tags: ['Statistics', 'Reports', 'AI'],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: 'Task Manager',
    meta: '84 completed',
    description: 'Automated workflow management with priority scheduling',
    icon: 'check-circle',
    status: 'Updated',
    tags: ['Productivity', 'Automation'],
  },
  {
    title: 'Media Library',
    meta: '12GB used',
    description: 'Cloud storage with intelligent content processing',
    icon: 'video',
    tags: ['Storage', 'CDN'],
    colSpan: 2,
  },
  {
    title: 'Global Network',
    meta: '6 regions',
    description: 'Multi-region deployment with edge computing',
    icon: 'globe',
    status: 'Beta',
    tags: ['Infrastructure', 'Edge'],
  },
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3 lg:gap-6">
      {items.map((item, i) => (
        <BentoCard key={i} item={item} />
      ))}
    </div>
  );
}

function BentoCard({ item }: { item: BentoItem }) {
  const isSite = item.type === 'site';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-4 transition-all duration-300',
        'border border-gray-100/80 bg-white dark:border-white/10 dark:bg-black',
        'hover:shadow-[0_1px_6px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_1px_6px_rgba(255,255,255,0.02)]',
        'will-change-transform hover:-translate-y-0.5',
        isSite ? 'flex h-full flex-col' : '',
        // Responsive column spanning
        item.colSpan === 2
          ? 'col-span-1 sm:col-span-2 lg:col-span-2'
          : 'col-span-1',
        {
          '-translate-y-0.5 shadow-[0_1px_6px_rgba(0,0,0,0.02)]':
            item.hasPersistentHover,
          'dark:shadow-[0_1px_6px_rgba(255,255,255,0.02)]':
            item.hasPersistentHover,
        }
      )}
    >
      {/* Background pattern */}
      <div
        className={`absolute inset-0 ${
          item.hasPersistentHover
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        } transition-opacity duration-300`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:4px_4px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      </div>

      {isSite ? <SiteContent item={item} /> : <DefaultContent item={item} />}

      {/* Gradient border */}
      <div
        className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-gray-100/50 to-transparent p-px dark:via-white/10 ${
          item.hasPersistentHover
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        } transition-opacity duration-300`}
      />
    </div>
  );
}

function SiteContent({ item }: { item: BentoItem }) {
  return (
    <div className="relative flex h-full flex-col space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/5 transition-all duration-300 group-hover:bg-gradient-to-br sm:h-10 sm:w-10 dark:bg-white/10">
            {item.favicon ? (
              <Image
                src={item.favicon}
                alt={`${item.domain} favicon`}
                width={20}
                height={20}
                className="rounded-sm"
              />
            ) : (
              getIconComponent(item.icon)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-medium tracking-tight text-gray-900 sm:text-[15px] dark:text-gray-100">
              {item.title}
            </h3>
            <p className="truncate text-xs font-normal text-gray-500 dark:text-gray-400">
              {item.meta}
            </p>
          </div>
        </div>
        {item.score && (
          <ScoreBadge
            score={item.score}
            className="shrink-0 scale-75 sm:scale-90"
          />
        )}
      </div>

      {/* Preview Image */}
      {item.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
          <Image
            src={item.image}
            alt={`${item.domain} preview`}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      )}

      {/* Description */}
      <p className="line-clamp-2 flex-1 text-xs leading-snug font-[425] text-gray-600 sm:line-clamp-3 sm:text-sm dark:text-gray-300">
        {item.description}
      </p>

      {/* Tags */}
      <div className="space-y-2 sm:space-y-3">
        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Code2 className="h-3 w-3 shrink-0 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center space-x-1">
              {item.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-md bg-black/5 px-1.5 py-0.5 text-xs text-gray-600 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 sm:px-2 sm:py-1 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {item.tags && item.tags.length > 0 && (
          <div
            className={cn(
              'flex gap-1',
              item.tags.length > 2
                ? 'flex-col items-start space-y-1'
                : 'flex-wrap items-center'
            )}
          >
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-md bg-black/5 px-1.5 py-0.5 text-xs text-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 sm:px-2 sm:py-1 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 sm:pt-2">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{item.readingTime} min</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {item.href && (
            <Button
              asChild
              size="sm"
              className="h-6 px-2 text-xs sm:h-7 sm:px-3"
            >
              <Link href={item.href}>
                <span className="hidden sm:inline">Analyse</span>
                <span className="sm:hidden">Voir</span>
                <ArrowRight className="ml-0.5 h-3 w-3 sm:ml-1" />
              </Link>
            </Button>
          )}
          {item.externalUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-6 w-6 p-0 sm:h-7 sm:w-7"
            >
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Visiter le site"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultContent({ item }: { item: BentoItem }) {
  return (
    <div className="relative flex flex-col space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/5 transition-all duration-300 group-hover:bg-gradient-to-br sm:h-8 sm:w-8 dark:bg-white/10">
          {getIconComponent(item.icon)}
        </div>
        <span
          className={cn(
            'rounded-lg px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm sm:px-2 sm:py-1',
            'bg-black/5 text-gray-600 dark:bg-white/10 dark:text-gray-300',
            'transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20'
          )}
        >
          {item.status || 'Active'}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-sm font-medium tracking-tight text-gray-900 sm:text-[15px] dark:text-gray-100">
          {item.title}
          {item.meta && (
            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
              {item.meta}
            </span>
          )}
        </h3>
        <p className="text-xs leading-snug font-[425] text-gray-600 sm:text-sm dark:text-gray-300">
          {item.description}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div
          className={cn(
            'flex text-xs text-gray-500 dark:text-gray-400',
            item.tags && item.tags.length > 2
              ? 'flex-col items-start space-y-1'
              : 'flex-wrap items-center space-x-1 sm:space-x-2'
          )}
        >
          {item.tags?.map((tag, i) => (
            <span
              key={i}
              className="rounded-md bg-black/5 px-1.5 py-0.5 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 sm:px-2 sm:py-1 dark:bg-white/10 dark:hover:bg-white/20"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
          {item.cta || 'Explore →'}
        </span>
      </div>
    </div>
  );
}

export { BentoGrid };
