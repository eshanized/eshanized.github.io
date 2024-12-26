import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import ArticleFilters from '../components/articles/ArticleFilters';
import ArticleGrid from '../components/articles/ArticleGrid';
import { useDevToArticles } from '../hooks/useDevToArticles';
import { filterArticles } from '../utils/filter';

function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  const { data: articles = [], isLoading, error } = useDevToArticles();
  
  const tags = useMemo(() => {
    const tagSet = new Set(articles.flatMap(article => article.tags));
    return Array.from(tagSet).sort();
  }, [articles]);
  
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchQuery, selectedTag);
  }, [articles, searchQuery, selectedTag]);

  return (
    <Layout
      title="Articles"
      description="Read my latest articles and blog posts"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Articles</h1>
        
        <ArticleFilters
          tags={tags}
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          onTagChange={setSelectedTag}
          onSearchChange={setSearchQuery}
        />
        
        <ArticleGrid
          articles={filteredArticles}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </Layout>
  );
}

export default Articles;