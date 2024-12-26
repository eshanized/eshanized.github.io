import React from 'react';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';
import LoadingSkeleton from '../LoadingSkeleton';

interface ArticleGridProps {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
}

function ArticleGrid({ articles, isLoading, error }: ArticleGridProps) {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">
          Error loading articles: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoadingSkeleton type="card" count={6} />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No articles found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleGrid;