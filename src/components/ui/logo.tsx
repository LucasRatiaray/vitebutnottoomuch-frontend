import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Classes CSS personnalisées
   */
  className?: string;
  /**
   * Couleur du logo (utilise currentColor par défaut)
   */
  color?: string;
  /**
   * Largeur du logo
   */
  width?: number | string;
  /**
   * Hauteur du logo
   */
  height?: number | string;
  /**
   * Épaisseur du trait
   */
  strokeWidth?: number | string;
  /**
   * Taille prédéfinie (remplace width et height)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
  '2xl': 'h-12 w-12',
};

export const Logo: React.FC<LogoProps> = ({
  className,
  color = 'currentColor',
  width = 32,
  height = 32,
  strokeWidth = 2,
  size,
  ...props
}) => {
  // Si une taille prédéfinie est spécifiée, on l'utilise
  const sizeClass = size ? sizeClasses[size] : '';

  // Déterminer les dimensions finales
  const finalWidth = size ? undefined : width;
  const finalHeight = size ? undefined : height;

  return (
    <svg
      className={cn('text-primary', sizeClass || 'h-auto w-auto', className)}
      xmlns="http://www.w3.org/2000/svg"
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      color={color}
      {...props}
    >
      <path
        d="M12 2C7.85786 2 4.5 5.35786 4.5 9.5C4.5 11.816 5.54973 13.8867 7.19934 15.2625C8.19018 16.0889 9 17.2098 9 18.5H15C15 17.2098 15.8098 16.0889 16.8007 15.2625C18.4503 13.8867 19.5 11.816 19.5 9.5C19.5 5.35786 16.1421 2 12 2Z"
        stroke="currentColor"
      />
      <path
        d="M15 18.5H9V20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5V18.5Z"
        stroke="currentColor"
      />
      <path
        d="M10 8C10 6.98748 10.8954 6 12 6C13.1046 6 14 6.82081 14 7.83333C14 8.19831 13.8837 8.53837 13.6831 8.82406C13.0854 9.67553 12 10.4875 12 11.5"
        stroke="currentColor"
      />
      <path d="M11.992 14H12.001" stroke="currentColor" />
    </svg>
  );
};

export default Logo;
