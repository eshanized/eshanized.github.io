import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, ExternalLink } from 'lucide-react';
import { Article } from '../../types';
import { formatDate } from '../../utils/date';

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  const tags = Array.isArray(article.tags) ? article.tags : article.tags?.split(',') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-nord-polar-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-nord-polar-3 flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-nord-snow-1">
          <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-nord-frost-2 flex items-center gap-2"
          >
            {article.title}
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>
        
        <p className="text-gray-600 dark:text-nord-snow-2 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-nord-polar-3 text-primary-700 dark:text-nord-frost-2"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-gray-100 dark:border-nord-polar-3">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-nord-snow-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.reading_time_minutes} min read
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-aurora-1" />
              {article.positive_reactions_count}
            </span>
          </div>
          <time className="text-sm">{formatDate(article.published_at)}</time>
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleCard;