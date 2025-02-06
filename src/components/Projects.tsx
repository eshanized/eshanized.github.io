import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Github, Gitlab as GitlabLogo, Calendar, Search, Code, ExternalLink } from 'lucide-react';
import { LanguageIcon } from '../components/LanguageIcon';
import { Repository } from '../types';

interface ProjectsProps {
  repositories: Repository[];
}

export function Projects({ repositories }: ProjectsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<'all' | 'github' | 'gitlab'>('all');

  function formatTimeAgo(date: string): string {
    const now = new Date();
    const updated = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }

  const filteredRepositories = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repo.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || repo.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const stats = {
    total: repositories.length,
    github: repositories.filter(repo => repo.source === 'github').length,
    gitlab: repositories.filter(repo => repo.source === 'gitlab').length
  };

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
            Projects & Repositories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore my latest projects and contributions from GitHub and GitLab
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
              <Code className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.total}</span>
            </div>
            <h3 className="text-xl font-medium">Total Projects</h3>
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
              <Github className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.github}</span>
            </div>
            <h3 className="text-xl font-medium">GitHub Projects</h3>
            <p className="text-blue-100 mt-1 text-sm">Open source contributions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <GitlabLogo className="w-8 h-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.gitlab}</span>
            </div>
            <h3 className="text-xl font-medium">GitLab Projects</h3>
            <p className="text-orange-100 mt-1 text-sm">Private and team projects</p>
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
                  onClick={() => setSelectedSource('all')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedSource === 'all'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  All ({stats.total})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSource('github')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedSource === 'github'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  GitHub ({stats.github})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSource('gitlab')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedSource === 'gitlab'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  GitLab ({stats.gitlab})
                </motion.button>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepositories.map((repo, index) => (
              <motion.a
                key={`${repo.source}-${repo.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {repo.source === 'github' ? (
                      <Github className="text-gray-600 group-hover:text-purple-600 transition-colors" size={24} />
                    ) : (
                      <GitlabLogo className="text-gray-600 group-hover:text-purple-600 transition-colors" size={24} />
                    )}
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">{repo.name}</h3>
                  </div>
                  <ExternalLink className="text-gray-400 group-hover:text-purple-600 transition-colors" size={20} />
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{repo.description}</p>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {repo.language && (
                    <LanguageIcon
                      language={repo.language}
                      className="text-sm text-gray-600"
                    />
                  )}
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm text-gray-600">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={16} className="text-blue-500" />
                    <span className="text-sm text-gray-600">{repo.forks_count}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>Updated {formatTimeAgo(repo.updated_at)}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}