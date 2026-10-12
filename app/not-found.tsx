import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Terminal className="w-5 h-5 text-coral-500" />
          <span className="font-mono text-sm text-coral-500">404</span>
        </div>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">
          This page is outside the narrative.
        </h1>
        <p className="text-foreground-muted text-lg mb-10 leading-relaxed">
          The story lives on a single page. Return to the beginning to start
          from the introduction.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-coral-500/40 text-coral-400 rounded-lg hover:bg-coral-500/10 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to the beginning
        </Link>
      </div>
    </div>
  );
}
