import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'text' | 'circle';
  className?: string;
}

function LoadingSkeleton({ count = 1, type = 'text', className = '' }: LoadingSkeletonProps) {
  const skeletons = Array(count).fill(null);

  const getSkeletonClass = () => {
    const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md';
    switch (type) {
      case 'card':
        return `${baseClass} h-48 w-full`;
      case 'circle':
        return `${baseClass} h-12 w-12 rounded-full`;
      default:
        return `${baseClass} h-4 w-full`;
    }
  };

  return (
    <div className={className}>
      {skeletons.map((_, index) => (
        <div key={index} className={`${getSkeletonClass()} mb-4`} />
      ))}
    </div>
  );
}

export default LoadingSkeleton;