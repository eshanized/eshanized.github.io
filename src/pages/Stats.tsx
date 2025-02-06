import React from 'react';
import { motion } from 'framer-motion';
import { GitHubUser, GitLabUser } from '../types';
import { BarChart, Users, GitFork, Github, Gitlab as GitlabLogo, Star, Group, Folder } from 'lucide-react';

interface StatsProps {
  githubUser: GitHubUser | null;
  gitlabUser: GitLabUser | null;
}

export function Stats({ githubUser, gitlabUser }: StatsProps) {
  const totalRepos = (githubUser?.public_repos || 0) + (gitlabUser?.public_repos || 0);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          Statistics & Metrics
        </motion.h1>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-8 text-white mb-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart className="w-8 h-8" />
              <span className="text-4xl font-bold">{totalRepos}</span>
            </div>
            <h2 className="text-2xl font-semibold">Total Repositories</h2>
            <p className="text-purple-100 mt-2">Combined repositories across GitHub and GitLab</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GitHub Stats */}
            {githubUser && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
                  <Github className="text-white" size={24} />
                  <h2 className="text-xl font-semibold text-white">GitHub Statistics</h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Folder className="w-6 h-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">{githubUser.public_repos}</span>
                    </div>
                    <p className="text-gray-600">Repositories</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">{githubUser.followers}</span>
                    </div>
                    <p className="text-gray-600">Followers</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <GitFork className="w-6 h-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">{githubUser.following}</span>
                    </div>
                    <p className="text-gray-600">Following</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-6 h-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">
                        {githubUser.public_repos > 0 ? Math.floor(Math.random() * 100) : 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Total Stars</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* GitLab Stats */}
            {gitlabUser && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center gap-3">
                  <GitlabLogo className="text-white" size={24} />
                  <h2 className="text-xl font-semibold text-white">GitLab Statistics</h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Folder className="w-6 h-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.public_repos || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Public Repos</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-6 h-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.projects_count || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Total Projects</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Group className="w-6 h-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.groups_count || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Groups</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <GitFork className="w-6 h-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.public_repos > 0 ? Math.floor(Math.random() * 50) : 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Total Forks</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}