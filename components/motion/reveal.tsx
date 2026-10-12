'use client';

import { useEffect, useRef, useState, type ReactNode, type ElementRef } from 'react';
import { cn } from '@/lib/utils';

type RevealTag = 'div' | 'section' | 'span' | 'p' | 'li' | 'h2' | 'h3';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Staggered delay tier 0–4 (0 = no extra delay) */
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: RevealTag;
}

const delayMap: Record<number, string> = {
  1: 'reveal-init-delay-1',
  2: 'reveal-init-delay-2',
  3: 'reveal-init-delay-3',
  4: 'reveal-init-delay-4',
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<Element>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: reveal immediately
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? delayMap[delay] : '';

  // Use a type-safe cast: ref generic is Element, the concrete tag satisfies it
  const AnyTag = Tag as React.ElementType;

  return (
    <AnyTag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        'reveal-init',
        delayClass,
        visible && 'reveal-visible',
        className
      )}
    >
      {children}
    </AnyTag>
  );
}
