import { cn } from "@/lib/utils";
import Link from "next/link";
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
} from "lucide-react";

// Mapping des catégories vers les icônes
const categoryIcons: Record<string, React.ReactNode> = {
  "développement": <Code2 className="h-6 w-6" />,
  "design": <Palette className="h-6 w-6" />,
  "intelligence artificielle": <Brain className="h-6 w-6" />,
  "e-commerce": <ShoppingCart className="h-6 w-6" />,
  "mobile": <Smartphone className="h-6 w-6" />,
  "business": <Briefcase className="h-6 w-6" />,
  "photographie": <Camera className="h-6 w-6" />,
  "musique": <Music className="h-6 w-6" />,
  "actualités": <Globe className="h-6 w-6" />,
  "éducation": <BookOpen className="h-6 w-6" />,
  "jeux": <Gamepad2 className="h-6 w-6" />,
  "default": <Zap className="h-6 w-6" />,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
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
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 hover:no-underline transition-all duration-200",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 dark:from-primary/10 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/5 dark:from-primary/10 to-transparent pointer-events-none" />
      )}
      
      <div className="mb-4 relative z-10 px-10 text-muted-foreground group-hover/feature:text-primary transition-colors duration-200">
        {getIcon(title)}
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
          {count && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({count})
            </span>
          )}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10 group-hover/feature:text-muted-foreground/80">
        {description}
      </p>
    </Link>
  );
};
