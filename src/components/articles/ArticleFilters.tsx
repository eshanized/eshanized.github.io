import React from 'react';
import { Search } from 'lucide-react';

interface ArticleFiltersProps {
  tags: string[];
  selectedTag: string;
  searchQuery: string;
  onTagChange: (tag: string) => void;
  onSearchChange: (query: string) => void;
}

function ArticleFilters({
  tags,
  selectedTag,
  searchQuery,
  onTagChange,
  onSearchChange
}: ArticleFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-nord-polar-2 focus:ring-2 focus:ring-primary-500 dark:focus:ring-nord-frost-2"
          />
        </div>
        
        <select
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-nord-polar-2 focus:ring-2 focus:ring-primary-500 dark:focus:ring-nord-frost-2"
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ArticleFilters;