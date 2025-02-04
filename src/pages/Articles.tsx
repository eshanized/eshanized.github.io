import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ThumbsUp, MessageCircle, Tag, ExternalLink, Search, BookOpen, Hash, FileText, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { DevToArticle, MediumArticle } from '../types';
import { AnimatedButton } from '../components/AnimatedButton';

interface ArticlesProps {
  devtoUsername?: string;
  mediumUsername?: string;
}

export function Articles({ devtoUsername = 'eshanized', mediumUsername = '@eshanized' }: ArticlesProps) {
  const [devtoArticles, setDevtoArticles] = useState<DevToArticle[]>([]);
  const [mediumArticles, setMediumArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'devto' | 'medium'>('all');
  const [selectedArticle, setSelectedArticle] = useState<(DevToArticle | MediumArticle) | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const devtoResponse = await fetch(`https://dev.to/api/articles?username=${devtoUsername}`);
        if (!devtoResponse.ok) throw new Error('Failed to fetch Dev.to articles');
        const devtoData = await devtoResponse.json();
        setDevtoArticles(Array.isArray(devtoData) ? devtoData : []);

        const mediumResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`);
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

  const filteredArticles = [...devtoArticles, ...mediumArticles.map(article => ({
    id: article.link,
    title: article.title,
    description: article.content?.replace(/<[^>]*>/g, '').slice(0, 200) + '...' || 'No description available',
    url: article.link,
    published_at: article.pubDate,
    tag_list: article.categories || [],
    reading_time_minutes: Math.ceil((article.content?.split(' ').length || 0) / 200),
    positive_reactions_count: 0,
    comments_count: 0,
    source: 'medium' as const
  }))].filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'devto' && !('source' in article)) ||
                      (activeTab === 'medium' && 'source' in article);
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: filteredArticles.length,
    devto: devtoArticles.length,
    medium: mediumArticles.length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-red-600 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              ⚠️
            </motion.div>
            <p className="text-xl font-semibold mt-2">{error}</p>
          </div>
          <AnimatedButton
            onClick={() => window.location.reload()}
            variant="secondary"
            size="sm"
          >
            Try Again
          </AnimatedButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] opacity-5 bg-cover bg-center fixed" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Articles & Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore my latest thoughts, tutorials, and insights from Dev.to and Medium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Hash className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.total}</span>
            </div>
            <h3 className="text-xl font-medium">Total Articles</h3>
            <p className="text-purple-100 mt-1 text-sm">Combined from all platforms</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.devto}</span>
            </div>
            <h3 className="text-xl font-medium">Dev.to Posts</h3>
            <p className="text-blue-100 mt-1 text-sm">Technical articles and tutorials</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.medium}</span>
            </div>
            <h3 className="text-xl font-medium">Medium Stories</h3>
            <p className="text-green-100 mt-1 text-sm">In-depth articles and insights</p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl mb-8 p-6"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === 'medium'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  Medium ({stats.medium})
                </motion.button>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 gap-6"
            >
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layoutId={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/20 cursor-pointer group"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            'source' in article 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {'source' in article ? 'Medium' : 'Dev.to'}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <Calendar size={16} />
                            {format(parseISO(article.published_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-2">{article.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {article.tag_list.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm"
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
                          className="block p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
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