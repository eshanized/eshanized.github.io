import { motion } from 'framer-motion';
import {
  Github,
  Gitlab as GitlabLogo,
  ArrowRight,
  Code,
  Briefcase,
  BarChart as ChartBar,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { GitHubUser, GitLabUser } from '../types';

interface HomeProps {
  githubUser: GitHubUser | null;
  gitlabUser: GitLabUser | null;
}

export function Home({ githubUser, gitlabUser }: HomeProps) {
  if (!githubUser && !gitlabUser) return null;

  const user = githubUser || gitlabUser;

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/eshanized',
      color: 'bg-[#1DA1F2]',
      hoverColor: 'hover:bg-[#1a8cd8]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/eshanized',
      color: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#094fb0]',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/eshanized',
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      hoverColor: 'hover:opacity-90',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@eshanized',
      color: 'bg-[#FF0000]',
      hoverColor: 'hover:bg-[#e50000]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/eshanized',
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166fe5]',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        <div className="absolute inset-0 bg-[url('/assets/images/eshanized-bg.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center bg-no-repeat opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-white"
          >
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              {githubUser && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 opacity-75 blur-2xl transition-all duration-500 group-hover:opacity-100" />
                  <img
                    src={githubUser.avatar_url}
                    alt={`${githubUser.name} on GitHub`}
                    className="relative z-10 h-24 w-24 rounded-full border-4 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-white/40 md:h-32 md:w-32 lg:h-48 lg:w-48"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="absolute bottom-0 right-0 z-20 rounded-full border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-lg md:p-3"
                  >
                    <Github className="h-4 w-4 text-white md:h-6 md:w-6" />
                  </motion.div>
                </motion.div>
              )}
              {gitlabUser && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-red-400/30 opacity-75 blur-2xl transition-all duration-500 group-hover:opacity-100" />
                  <img
                    src={gitlabUser.avatar_url}
                    alt={`${gitlabUser.name} on GitLab`}
                    className="relative z-10 h-24 w-24 rounded-full border-4 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-white/40 md:h-32 md:w-32 lg:h-48 lg:w-48"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="absolute bottom-0 right-0 z-20 rounded-full border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-lg md:p-3"
                  >
                    <GitlabLogo className="h-4 w-4 text-white md:h-6 md:w-6" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl" />
              <h1 className="relative mb-4 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-7xl">
                {user?.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8 h-12 text-lg text-purple-200 sm:h-16 sm:text-xl md:h-20 md:text-2xl lg:text-3xl"
            >
              <Typewriter
                options={{
                  strings: [
                    'Founder of Snigdha OS',
                    'Open Source Contributor',
                    'Lead Developer & Core Maintainer',
                    'Tech Enthusiast',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 5,
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mx-auto mb-12 max-w-3xl px-4 text-base font-light leading-relaxed text-white/80 sm:text-lg md:text-xl lg:text-2xl"
            >
              {user?.bio}
            </motion.p>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mb-12 flex flex-wrap justify-center gap-3 px-4 md:mb-16 md:gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 1.4 + index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur-lg transition-all duration-300 md:p-4 ${social.hoverColor}`}
                  title={social.name}
                >
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ y: -5 }}
              className="w-full"
            >
              <Link
                to="/about"
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:p-8"
              >
                <Code className="mb-4 h-8 w-8 text-purple-300 transition-colors group-hover:text-white md:h-10 md:w-10" />
                <h2 className="mb-2 flex items-center justify-between text-xl font-semibold transition-colors group-hover:text-purple-200 md:text-2xl">
                  About
                  <ArrowRight className="transform transition-transform group-hover:translate-x-2" />
                </h2>
                <p className="text-sm text-white/60 transition-colors group-hover:text-white/80 md:text-base">
                  Learn more about my journey and expertise
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ y: -5 }}
              className="w-full"
            >
              <Link
                to="/projects"
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:p-8"
              >
                <Briefcase className="mb-4 h-8 w-8 text-purple-300 transition-colors group-hover:text-white md:h-10 md:w-10" />
                <h2 className="mb-2 flex items-center justify-between text-xl font-semibold transition-colors group-hover:text-purple-200 md:text-2xl">
                  Projects
                  <ArrowRight className="transform transition-transform group-hover:translate-x-2" />
                </h2>
                <p className="text-sm text-white/60 transition-colors group-hover:text-white/80 md:text-base">
                  Explore my latest work and contributions
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ y: -5 }}
              className="w-full sm:col-span-2 lg:col-span-1"
            >
              <Link
                to="/stats"
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:p-8"
              >
                <ChartBar className="mb-4 h-8 w-8 text-purple-300 transition-colors group-hover:text-white md:h-10 md:w-10" />
                <h2 className="mb-2 flex items-center justify-between text-xl font-semibold transition-colors group-hover:text-purple-200 md:text-2xl">
                  Stats
                  <ArrowRight className="transform transition-transform group-hover:translate-x-2" />
                </h2>
                <p className="text-sm text-white/60 transition-colors group-hover:text-white/80 md:text-base">
                  View my GitHub and GitLab statistics
                </p>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="mt-8 flex flex-col justify-center gap-4 px-4 sm:flex-row md:mt-16 md:gap-6"
          >
            {githubUser && (
              <motion.a
                href={`https://github.com/${githubUser.login}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:px-8 md:py-4"
              >
                <Github size={20} className="md:h-6 md:w-6" />
                <span className="text-sm font-medium md:text-base">GitHub Profile</span>
              </motion.a>
            )}
            {gitlabUser && (
              <motion.a
                href={`https://gitlab.com/${gitlabUser.username}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:px-8 md:py-4"
              >
                <GitlabLogo size={20} className="md:h-6 md:w-6" />
                <span className="text-sm font-medium md:text-base">GitLab Profile</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
