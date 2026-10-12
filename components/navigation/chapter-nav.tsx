'use client';

import { useEffect, useState } from 'react';
import { chapters } from '@/content/narrative';
import { cn } from '@/lib/utils';

export function ChapterNav() {
  const [activeId, setActiveId] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topMost = intersecting.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          );
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Chapter navigation"
      className={cn(
        'fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-opacity duration-500',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <ul className="flex flex-col gap-1.5">
        {chapters.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className="group flex items-center gap-3 justify-end py-1"
                aria-label={`Chapter ${ch.number}: ${ch.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'font-mono text-[10px] tracking-wider transition-all duration-300',
                    isActive
                      ? 'text-coral-400 opacity-100'
                      : 'text-foreground-subtle opacity-0 group-hover:opacity-100'
                  )}
                >
                  {ch.number} · {ch.title}
                </span>
                <span
                  className={cn(
                    'block h-px transition-all duration-300',
                    isActive
                      ? 'w-8 bg-coral-500'
                      : 'w-4 bg-foreground-subtle group-hover:w-6 group-hover:bg-foreground-muted'
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
