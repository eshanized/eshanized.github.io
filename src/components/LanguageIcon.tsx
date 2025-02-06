import React from 'react';
import { Circle } from 'lucide-react';

const languageColors: { [key: string]: string } = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

interface LanguageIconProps {
  language: string;
  className?: string;
}

export function LanguageIcon({ language, className = '' }: LanguageIconProps) {
  const color = languageColors[language] || '#8e8e8e';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Circle
        fill={color}
        size={12}
        className="stroke-none"
      />
      <span>{language}</span>
    </div>
  );
}