'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { identity } from '@/lib/identity';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export function SiteHeader({ backToHome = false }: { backToHome?: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Biography', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Publications', href: '/publications' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          {backToHome && (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-subtle hover:text-coral-400 transition-colors mr-2"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-coral-500 group-hover:scale-125 transition-transform" />
            <span className="font-display font-semibold text-foreground text-sm sm:text-base tracking-tight">
              {identity.name}
            </span>
            <span className="font-mono text-xs text-foreground-subtle group-hover:text-coral-400 transition-colors">
              /{identity.alternateName}
            </span>
          </Link>
        </div>

        <nav aria-label="Primary navigation" className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-mono text-xs px-2.5 py-1.5 rounded transition-colors',
                  isActive
                    ? 'text-coral-400 font-medium bg-secondary/50'
                    : 'text-foreground-muted hover:text-foreground hover:bg-secondary/20'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
