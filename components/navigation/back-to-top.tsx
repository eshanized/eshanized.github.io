'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Return to the beginning"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5',
        'border border-coral-500/30 bg-background/80 backdrop-blur-sm',
        'text-coral-400 rounded-lg text-sm font-medium',
        'hover:bg-coral-500/10 hover:border-coral-500/50 transition-all duration-300',
        'opacity-0 translate-y-4 pointer-events-none',
        visible && 'opacity-100 translate-y-0 pointer-events-auto'
      )}
    >
      <ArrowUp className="w-4 h-4" />
      <span className="hidden sm:inline">Beginning</span>
    </button>
  );
}
