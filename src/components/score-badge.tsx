import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { getScoreVariant } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  className?: string;
  showIcon?: boolean;
}

export function ScoreBadge({ score, className, showIcon = true }: ScoreBadgeProps) {
  const variant = getScoreVariant(score);
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6.5) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Badge 
      variant={variant} 
      className={cn(
        "flex items-center gap-1 font-medium",
        getScoreColor(score),
        className
      )}
    >
      {showIcon && <Star className="h-3 w-3 fill-current" />}
      {score.toFixed(1)}/10
    </Badge>
  );
}