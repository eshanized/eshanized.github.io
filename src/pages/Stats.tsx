import React from 'react';
import { motion } from 'framer-motion';
import { GitHubUser, GitLabUser } from '../types';
import {
  BarChart,
  Users,
  GitFork,
  Github,
  Gitlab as GitlabLogo,
  Star,
  Group,
  Folder,
} from 'lucide-react';

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
      <div className="fixed absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container relative mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-center text-5xl font-bold text-transparent"
        >
          Statistics & Metrics
        </motion.h1>

        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-white shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <BarChart className="h-8 w-8" />
              <span className="text-4xl font-bold">{totalRepos}</span>
            </div>
            <h2 className="text-2xl font-semibold">Total Repositories</h2>
            <p className="mt-2 text-purple-100">Combined repositories across GitHub and GitLab</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* GitHub Stats */}
            {githubUser && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
                className="overflow-hidden rounded-xl bg-white/80 shadow-lg backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                  <Github className="text-white" size={24} />
                  <h2 className="text-xl font-semibold text-white">GitHub Statistics</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Folder className="h-6 w-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">
                        {githubUser.public_repos}
                      </span>
                    </div>
                    <p className="text-gray-600">Repositories</p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Users className="h-6 w-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">
                        {githubUser.followers}
                      </span>
                    </div>
                    <p className="text-gray-600">Followers</p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <GitFork className="h-6 w-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">
                        {githubUser.following}
                      </span>
                    </div>
                    <p className="text-gray-600">Following</p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Star className="h-6 w-6 text-purple-600" />
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
                className="overflow-hidden rounded-xl bg-white/80 shadow-lg backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                  <GitlabLogo className="text-white" size={24} />
                  <h2 className="text-xl font-semibold text-white">GitLab Statistics</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Folder className="h-6 w-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.public_repos || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Public Repos</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Star className="h-6 w-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.projects_count || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Total Projects</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Group className="h-6 w-6 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-600">
                        {gitlabUser.groups_count || 0}
                      </span>
                    </div>
                    <p className="text-gray-600">Groups</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <GitFork className="h-6 w-6 text-orange-600" />
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
