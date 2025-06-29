'use client';

import * as React from 'react';
import Link from 'next/link';
import { BrainIcon, PaletteIcon, CodeIcon } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

const mainLink = {
  title: 'Bookmarks',
  href: '/bookmarks',
};

const categoriesItems = [
  {
    title: 'Intelligence Artificielle',
    icon: <BrainIcon />,
    href: '/bookmarks/categories/ai',
    description: 'Machine learning, IA générative et automatisation',
  },
  {
    title: 'Design',
    icon: <PaletteIcon />,
    href: '/bookmarks/categories/design',
    description: 'UI/UX, design graphique et prototypage',
  },
  {
    title: 'Développement',
    icon: <CodeIcon />,
    href: '/bookmarks/categories/development',
    description: 'Frontend, backend et applications mobiles',
  },
];

export function NavbarOnScroll() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-transparent p-2 md:w-[70%] lg:w-[75%] lg:max-w-screen-xl',
        scrolled &&
          'bg-opacity-15 border-secondary dark:bg-navbar/50 bg-background/50 border shadow-inner backdrop-blur-sm'
      )}
    >
      <div className="flex flex-1">
        {/* ✅ Link remplace l’élément <a> pour satisfaire ESLint */}
        <Link
          href="/"
          className="-m-1.5 flex items-center gap-2 p-1.5"
          aria-label="vitebutnottoomuch - Retour à l'accueil"
        >
          <svg
            className="h-8 w-auto text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            color="currentColor"
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
          <span className="font-unbounded from-primary to-foreground bg-gradient-to-r bg-clip-text text-center text-sm text-transparent">
            vitebutnottoomuch.me
          </span>
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
              >
                <Link href={mainLink.href}>{mainLink.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Catégories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[280px] gap-2">
                  {categoriesItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <div className="hover:bg-secondary/20 flex items-center gap-2 rounded-md p-2">
                            {item.icon}
                            {item.title}
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-1 justify-end">
        <ModeToggle />
      </div>
    </header>
  );
}
