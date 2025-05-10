import React, { useState } from 'react';

export const MobileWarning: React.FC = () => {
  const [overrideWarning, setOverrideWarning] = useState(false);

  if (overrideWarning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6 text-center">
      <div className="max-w-md rounded-lg bg-zinc-900 p-8 shadow-xl">
        <div className="mb-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-white">Desktop Only Experience</h2>
        <p className="mb-4 text-gray-300">
          This portfolio is designed exclusively for desktop viewing to provide the best MacOS-inspired experience.
        </p>
        <p className="mb-6 text-gray-400">
          Please visit this site on a desktop or laptop computer for the full interactive experience.
        </p>
        <button 
          onClick={() => setOverrideWarning(true)}
          className="w-full rounded-lg bg-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-600"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
}; 