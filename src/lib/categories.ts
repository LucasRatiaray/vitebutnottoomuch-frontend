// File: src/lib/categories.ts
import { BrainIcon, PaletteIcon, CodeIcon } from 'lucide-react';

export interface CategoryItem {
  slug: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description?: string;
}

export const categoriesItems: CategoryItem[] = [
  {
    slug: 'ai',
    title: 'Intelligence Artificielle',
    icon: BrainIcon,
    description: 'Machine learning, IA générative et automatisation',
  },
  {
    slug: 'design',
    title: 'Design',
    icon: PaletteIcon,
    description: 'UI/UX, design graphique et prototypage',
  },
  {
    slug: 'development',
    title: 'Développement',
    icon: CodeIcon,
    description: 'Frontend, backend et applications mobiles',
  },
];

// Un petit helper si tu veux une map slug → item
export const CATEGORY_MAP: Record<string, CategoryItem> = Object.fromEntries(
  categoriesItems.map((item) => [item.slug, item])
) as Record<string, CategoryItem>;
