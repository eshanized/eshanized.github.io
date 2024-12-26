import React from 'react';

const BackgroundPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Large Gradient Blob 1 */}
      <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] rounded-full 
        bg-gradient-to-br from-primary-200/40 to-primary-400/20 
        dark:from-nord-frost-1/20 dark:to-nord-frost-2/20 
        blur-[100px] opacity-70 animate-blob" 
      />
      
      {/* Large Gradient Blob 2 */}
      <div className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] rounded-full 
        bg-gradient-to-tl from-primary-200/40 to-primary-400/20 
        dark:from-nord-frost-1/20 dark:to-nord-frost-2/20 
        blur-[100px] opacity-70 animate-blob" 
      />
      
      {/* Subtle Overlay for Texture */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] 
        dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.1)_0%,_transparent_70%)]"
      />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 
        opacity-10 dark:opacity-20 
        bg-[linear-gradient(0deg,_rgba(0,0,0,0.02)_1px,_transparent_1px)],
        [linear-gradient(90deg,_rgba(0,0,0,0.02)_1px,_transparent_1px)]
        bg-[size:20px_20px]"
      />
    </div>
  );
}

export default BackgroundPattern;