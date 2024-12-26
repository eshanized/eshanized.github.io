import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc } from 'lucide-react';

interface ProjectFiltersProps {
  languages: string[];
  selectedLanguage: string;
  searchQuery: string;
  onLanguageChange: (language: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: 'stars' | 'updated') => void;
}

function ProjectFilters({
  languages,
  selectedLanguage,
  searchQuery,
  onLanguageChange,
  onSearchChange,
  onSortChange
}: ProjectFiltersProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-nord-polar-3 bg-white dark:bg-nord-polar-2 focus:ring-2 focus:ring-primary-500 dark:focus:ring-nord-frost-2 transition-all"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-nord-polar-3 bg-white dark:bg-nord-polar-2 focus:ring-2 focus:ring-primary-500 dark:focus:ring-nord-frost-2 appearance-none transition-all"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="relative min-w-[160px]">
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => onSortChange(e.target.value as 'stars' | 'updated')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-nord-polar-3 bg-white dark:bg-nord-polar-2 focus:ring-2 focus:ring-primary-500 dark:focus:ring-nord-frost-2 appearance-none transition-all"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectFilters;