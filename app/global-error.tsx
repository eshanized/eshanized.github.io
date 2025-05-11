"use client";

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
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
    <html>
      <body>
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
          <div className="max-w-md mx-auto px-6 py-12 text-center bg-white shadow-lg rounded-lg">
            <AlertTriangle className="h-20 w-20 mx-auto mb-6 text-red-500" />
            <h1 className="text-4xl font-bold mb-3">Critical Error</h1>
            <p className="text-gray-600 mb-8">
              A critical error occurred in the application.
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 