"use client";

import React, { useState, useEffect } from 'react';
import BaseIOSApp from './BaseIOSApp';
import Image from 'next/image';
import { Heart, MessageCircle, Bookmark, Tag } from 'lucide-react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  description: string;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  published_at: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
}

export default function DevToApp() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://dev.to/api/articles?username=eshanized');
        const processedArticles = response.data.map((article: any) => ({
          ...article,
          tag_list: Array.isArray(article.tag_list) ? article.tag_list : 
                    typeof article.tags === 'string' ? article.tags.split(',').map((tag: string) => tag.trim()) :
                    []
        }));
        setArticles(processedArticles);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <BaseIOSApp title="DEV Community" rightAction="new">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading articles...</p>
        </div>
      </BaseIOSApp>
    );
  }

  if (error) {
    return (
      <BaseIOSApp title="DEV Community" rightAction="new">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </BaseIOSApp>
    );
  }

  return (
    <BaseIOSApp title="DEV Community" rightAction="new">
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700/60">
        {/* Profile Header */}
        <div className="p-4 bg-white dark:bg-black sticky top-0 z-10 backdrop-blur-xl bg-opacity-70 dark:bg-opacity-70">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src="https://github.com/eshanized.png"
                alt="Profile"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="ml-3">
              <h2 className="font-bold text-black dark:text-white">Eshan Roy</h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{articles.length} posts</span>
                <span className="mx-2">•</span>
                <span>Dev.to Articles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
        {articles.map((article) => (
          <article key={article.id} className="bg-white dark:bg-black p-4">
            <div className="flex flex-col">
              {/* Article Header */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={article.user.profile_image}
                    alt={article.user.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium text-black dark:text-white">{article.user.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {new Date(article.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <h2 className="text-xl font-bold text-black dark:text-white mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {article.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tag_list.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-300 flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{article.positive_reactions_count}</span>
                  </button>
                  <button className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{article.comments_count}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{article.reading_time_minutes} min read</span>
                  <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </BaseIOSApp>
  );
} 