"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="max-w-md mx-auto px-6 py-12 text-center">
        <AlertCircle className="h-20 w-20 mx-auto mb-6 text-destructive animate-pulse" />
        <h1 className="text-4xl font-bold mb-3">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An error occurred while loading this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-muted text-muted-foreground font-medium rounded-md hover:bg-muted/80 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 