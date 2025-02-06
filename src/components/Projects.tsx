import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  GitFork,
  Github,
  Gitlab as GitlabLogo,
  Calendar,
  Search,
  Code,
  ExternalLink,
} from 'lucide-react';
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
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || repo.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const stats = {
    total: repositories.length,
    github: repositories.filter(repo => repo.source === 'github').length,
    gitlab: repositories.filter(repo => repo.source === 'gitlab').length,
  };

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
            Projects & Repositories
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore my latest projects and contributions from GitHub and GitLab
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
              <Code className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.total}</span>
            </div>
            <h3 className="text-xl font-medium">Total Projects</h3>
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
              <Github className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.github}</span>
            </div>
            <h3 className="text-xl font-medium">GitHub Projects</h3>
            <p className="mt-1 text-sm text-blue-100">Open source contributions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <GitlabLogo className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">{stats.gitlab}</span>
            </div>
            <h3 className="text-xl font-medium">GitLab Projects</h3>
            <p className="mt-1 text-sm text-orange-100">Private and team projects</p>
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
                  onClick={() => setSelectedSource('all')}
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
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
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
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
                  className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                    selectedSource === 'gitlab'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  GitLab ({stats.gitlab})
                </motion.button>
              </div>
              <div className="relative w-full md:w-72">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-12 pr-4 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepositories.map((repo, index) => (
              <motion.a
                key={`${repo.source}-${repo.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-purple-100/20 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {repo.source === 'github' ? (
                      <Github
                        className="text-gray-600 transition-colors group-hover:text-purple-600"
                        size={24}
                      />
                    ) : (
                      <GitlabLogo
                        className="text-gray-600 transition-colors group-hover:text-purple-600"
                        size={24}
                      />
                    )}
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-purple-600">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink
                    className="text-gray-400 transition-colors group-hover:text-purple-600"
                    size={20}
                  />
                </div>
                <p className="mb-4 line-clamp-2 text-gray-600">{repo.description}</p>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  {repo.language && (
                    <LanguageIcon language={repo.language} className="text-sm text-gray-600" />
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
                <div className="border-t border-gray-100 pt-4">
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
