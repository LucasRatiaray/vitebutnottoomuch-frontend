import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Code2,
  Zap,
  Palette,
  Brain,
  Smartphone,
  ShoppingCart,
  Briefcase,
  Camera,
  Music,
  Globe,
  BookOpen,
  Gamepad2,
} from 'lucide-react';

// Mapping des catégories vers les icônes
const categoryIcons: Record<string, React.ReactNode> = {
  développement: <Code2 className="h-6 w-6" />,
  design: <Palette className="h-6 w-6" />,
  'intelligence artificielle': <Brain className="h-6 w-6" />,
  'e-commerce': <ShoppingCart className="h-6 w-6" />,
  mobile: <Smartphone className="h-6 w-6" />,
  business: <Briefcase className="h-6 w-6" />,
  photographie: <Camera className="h-6 w-6" />,
  musique: <Music className="h-6 w-6" />,
  actualités: <Globe className="h-6 w-6" />,
  éducation: <BookOpen className="h-6 w-6" />,
  jeux: <Gamepad2 className="h-6 w-6" />,
  default: <Zap className="h-6 w-6" />,
};

interface CategoryFeature {
  title: string;
  description: string;
  href: string;
  count?: number;
}

interface FeaturesSectionProps {
  categories: CategoryFeature[];
}

export function CategoriesFeatureSection({ categories }: FeaturesSectionProps) {
  // Limiter à 8 catégories maximum pour le layout
  const displayCategories = categories.slice(0, 8);

  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {displayCategories.map((category, index) => (
        <CategoryFeature key={category.title} {...category} index={index} />
      ))}
    </div>
  );
}

const CategoryFeature = ({
  title,
  description,
  href,
  count,
  index,
}: CategoryFeature & { index: number }) => {
  // Obtenir l'icône basée sur le titre de la catégorie
  const getIcon = (categoryTitle: string) => {
    const lowerTitle = categoryTitle.toLowerCase();
    return categoryIcons[lowerTitle] || categoryIcons.default;
  };

  return (
    <Link
      href={href}
      className={cn(
        'group/feature relative flex flex-col py-10 transition-all duration-200 hover:no-underline lg:border-r dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className="from-primary/5 dark:from-primary/10 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="from-primary/5 dark:from-primary/10 pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}

      <div className="text-muted-foreground group-hover/feature:text-primary relative z-10 mb-4 px-10 transition-colors duration-200">
        {getIcon(title)}
      </div>

      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="bg-muted group-hover/feature:bg-primary absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full transition-all duration-200 group-hover/feature:h-8" />
        <span className="text-foreground inline-block transition duration-200 group-hover/feature:translate-x-2">
          {title}
          {count && (
            <span className="text-muted-foreground ml-2 text-sm font-normal">
              ({count})
            </span>
          )}
        </span>
      </div>

      <p className="text-muted-foreground group-hover/feature:text-muted-foreground/80 relative z-10 max-w-xs px-10 text-sm">
        {description}
      </p>
    </Link>
  );
};
