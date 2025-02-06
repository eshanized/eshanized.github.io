import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ThumbsUp,
  MessageCircle,
  Tag,
  ExternalLink,
  Search,
  BookOpen,
  Hash,
  FileText,
  Calendar,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { DevToArticle, MediumArticle } from '../types';
import { AnimatedButton } from '../components/AnimatedButton';

interface ArticlesProps {
  devtoUsername?: string;
  mediumUsername?: string;
}

export function Articles({
  devtoUsername = 'eshanized',
  mediumUsername = '@eshanized',
}: ArticlesProps) {
  const [devtoArticles, setDevtoArticles] = useState<DevToArticle[]>([]);
  const [mediumArticles, setMediumArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'devto' | 'medium'>('all');
  const [selectedArticle, setSelectedArticle] = useState<(DevToArticle | MediumArticle) | null>(
    null
  );

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const devtoResponse = await fetch(`https://dev.to/api/articles?username=${devtoUsername}`);
        if (!devtoResponse.ok) throw new Error('Failed to fetch Dev.to articles');
        const devtoData = await devtoResponse.json();
        setDevtoArticles(Array.isArray(devtoData) ? devtoData : []);

        const mediumResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`
        );
        if (!mediumResponse.ok) throw new Error('Failed to fetch Medium articles');
        const mediumData = await mediumResponse.json();
        setMediumArticles(Array.isArray(mediumData.items) ? mediumData.items : []);
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        console.error('Error fetching articles:', err);
        setDevtoArticles([]);
        setMediumArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [devtoUsername, mediumUsername]);

  const filteredArticles = [
    ...devtoArticles,
    ...mediumArticles.map(article => ({
      id: article.link,
      title: article.title,
      description:
        article.content?.replace(/<[^>]*>/g, '').slice(0, 200) + '...' ||
        'No description available',
      url: article.link,
      published_at: article.pubDate,
      tag_list: article.categories || [],
      reading_time_minutes: Math.ceil((article.content?.split(' ').length || 0) / 200),
      positive_reactions_count: 0,
      comments_count: 0,
      source: 'medium' as const,
    })),
  ].filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'devto' && !('source' in article)) ||
      (activeTab === 'medium' && 'source' in article);
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: filteredArticles.length,
    devto: devtoArticles.length,
    medium: mediumArticles.length,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-600"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-4 text-red-600">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              ⚠️
            </motion.div>
            <p className="mt-2 text-xl font-semibold">{error}</p>
          </div>
          <AnimatedButton onClick={() => window.location.reload()} variant="secondary" size="sm">
            Try Again
          </AnimatedButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20">
      <div className="fixed absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container relative mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent">
            Articles & Insights
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore my latest thoughts, tutorials, and insights from Dev.to and Medium
          </p>
        </motion.div>

        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <Hash className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.total}</span>
            </div>
            <h3 className="text-xl font-medium">Total Articles</h3>
            <p className="mt-1 text-sm text-purple-100">Combined from all platforms</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <FileText className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.devto}</span>
            </div>
            <h3 className="text-xl font-medium">Dev.to Posts</h3>
            <p className="mt-1 text-sm text-blue-100">Technical articles and tutorials</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <BookOpen className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.medium}</span>
            </div>
            <h3 className="text-xl font-medium">Medium Stories</h3>
            <p className="mt-1 text-sm text-green-100">In-depth articles and insights</p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('all')}
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                    activeTab === 'all'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  All ({stats.total})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('devto')}
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                    activeTab === 'devto'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  Dev.to ({stats.devto})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('medium')}
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                    activeTab === 'medium'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  Medium ({stats.medium})
                </motion.button>
              </div>
              <div className="relative w-full md:w-72">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-12 pr-4 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            <motion.div layout className="grid grid-cols-1 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layoutId={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer rounded-2xl border border-purple-100/20 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-4 flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                              'source' in article
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {'source' in article ? 'Medium' : 'Dev.to'}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <Calendar size={16} />
                            {format(parseISO(article.published_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <h2 className="mb-3 text-2xl font-semibold transition-colors group-hover:text-purple-600">
                          {article.title}
                        </h2>
                        <p className="mb-6 line-clamp-2 text-gray-600">{article.description}</p>

                        <div className="mb-6 flex flex-wrap gap-2">
                          {article.tag_list.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700"
                            >
                              <Tag size={14} />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <Clock size={16} />
                            {article.reading_time_minutes} min read
                          </span>
                          {!('source' in article) && (
                            <>
                              <span className="flex items-center gap-2">
                                <ThumbsUp size={16} />
                                {article.positive_reactions_count}
                              </span>
                              <span className="flex items-center gap-2">
                                <MessageCircle size={16} />
                                {article.comments_count}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        className="shrink-0"
                      >
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-full bg-purple-50 p-3 text-purple-600 transition-colors hover:bg-purple-100"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={24} />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
