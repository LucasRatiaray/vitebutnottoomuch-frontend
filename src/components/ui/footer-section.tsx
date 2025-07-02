'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { TrendingUp, Github, Twitter, Instagram } from 'lucide-react';
import Logo from './logo';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Accueil', href: '/' },
      { title: 'Sites', href: '/sites' },
      { title: 'Catégories', href: '/categories' },
    ],
  },
  {
    label: 'Ressources',
    links: [
      { title: 'Documentation', href: '/docs' },
      { title: 'API', href: '/api' },
      { title: 'Blog', href: '/blog' },
      { title: 'Aide', href: '/help' },
    ],
  },
  {
    label: 'Légal',
    links: [
      { title: 'Politique de confidentialité', href: '/privacy' },
      { title: "Conditions d'utilisation", href: '/terms' },
      { title: 'À propos', href: '/about' },
    ],
  },
  {
    label: 'Suivez-nous',
    links: [
      { title: 'GitHub', href: '#', icon: Github },
      { title: 'Twitter', href: '#', icon: Twitter },
      { title: 'Instagram', href: '#', icon: Instagram },
    ],
  },
];

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.primary/8%),transparent)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-unbounded text-xl font-bold">
              vitebutnottoomuch.me
            </span>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm">
            Le catalogue de la performance web équilibrée. Découvrez des sites
            qui allient vitesse et fonctionnalités.
          </p>
          <p className="text-muted-foreground mt-8 text-sm md:mt-4">
            © {new Date().getFullYear()} Vitebutnottoomuch. Tous droits
            réservés.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
                  {section.label}
                </h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.href.startsWith('http') || link.href === '#' ? (
                        <a
                          href={link.href}
                          className="hover:text-primary inline-flex items-center transition-all duration-300 hover:translate-x-1"
                          target={
                            link.href.startsWith('http') ? '_blank' : undefined
                          }
                          rel={
                            link.href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          {link.icon && <link.icon className="me-2 size-4" />}
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="hover:text-primary inline-flex items-center transition-all duration-300 hover:translate-x-1"
                        >
                          {link.icon && <link.icon className="me-2 size-4" />}
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
