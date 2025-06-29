// File: src/components/navbar.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon } from 'lucide-react';

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
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import { categoriesItems } from '@/lib/categories';

const mainLink = {
  title: 'Sites',
  href: '/sites',
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setMobileMenuOpen(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          'bg-opacity-15 border-secondary dark:bg-navbar bg-primary/10 sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border px-2 py-2.5 shadow-inner backdrop-blur-sm transition-transform duration-300 ease-in-out md:w-[70%] lg:w-[75%] lg:max-w-screen-xl',
          isVisible ? 'translate-y-0' : '-translate-y-20'
        )}
      >
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <span className="sr-only">
              vitebutnottoomuch - Retour à l&#39;accueil
            </span>
            <Logo />
            <span className="font-unbounded from-primary to-foreground hidden bg-gradient-to-r bg-clip-text text-center text-sm text-transparent hover:cursor-pointer sm:block">
              vitebutnottoomuch.me
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center lg:flex">
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
                      <li key={item.slug}>
                        <NavigationMenuLink asChild>
                          <Link href={`/categories/${item.slug}`}>
                            <div className="hover:bg-secondary/20 flex items-center gap-2 rounded-md p-2">
                              <item.icon />
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

        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hover:bg-secondary/20 rounded-lg p-2 transition-colors lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-20 right-[5%] left-[5%] z-50 lg:hidden">
            <div className="bg-background/95 border-secondary max-h-[70vh] overflow-y-auto rounded-2xl border shadow-lg backdrop-blur-sm">
              <nav className="space-y-4 p-4">
                {/* Main Link */}
                <Link
                  href={mainLink.href}
                  className="hover:bg-secondary/20 flex items-center gap-3 rounded-lg p-3 transition-colors"
                >
                  <span className="font-medium">{mainLink.title}</span>
                </Link>

                {/* Categories Section */}
                <div className="space-y-2">
                  <h3 className="text-muted-foreground px-3 text-sm font-medium">
                    Catégories
                  </h3>
                  <div className="space-y-1">
                    {categoriesItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/categories/${item.slug}`}
                        className="hover:bg-secondary/20 flex items-start gap-3 rounded-lg p-3 transition-colors"
                      >
                        <div className="text-muted-foreground mt-0.5">
                          <item.icon />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
