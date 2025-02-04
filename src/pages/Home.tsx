import { motion } from 'framer-motion';
import { Github, Gitlab as GitlabLogo, ArrowRight, Code, Briefcase, BarChart as ChartBar, Twitter, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
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
      hoverColor: 'hover:bg-[#1a8cd8]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/eshanized',
      color: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#094fb0]'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/eshanized',
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      hoverColor: 'hover:opacity-90'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@eshanized',
      color: 'bg-[#FF0000]',
      hoverColor: 'hover:bg-[#e50000]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/eshanized',
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166fe5]'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/assets/images/eshanized-bg.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] opacity-30 bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-12"
          >
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              {githubUser && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-indigo-400/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500" />
                  <img
                    src={githubUser.avatar_url}
                    alt={`${githubUser.name} on GitHub`}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-all duration-500 group-hover:border-white/40 group-hover:scale-105"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-lg rounded-full p-2 md:p-3 shadow-lg z-20 border border-white/20"
                  >
                    <Github className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </motion.div>
                </motion.div>
              )}
              {gitlabUser && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500" />
                  <img
                    src={gitlabUser.avatar_url}
                    alt={`${gitlabUser.name} on GitLab`}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-all duration-500 group-hover:border-white/40 group-hover:scale-105"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-lg rounded-full p-2 md:p-3 shadow-lg z-20 border border-white/20"
                  >
                    <GitlabLogo className="w-4 h-4 md:w-6 md:h-6 text-white" />
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
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg blur-xl" />
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
                {user?.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-200 mb-8 h-12 sm:h-16 md:h-20"
            >
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Developer',
                    'Open Source Contributor',
                    'Problem Solver',
                    'Tech Enthusiast'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed px-4 font-light"
            >
              {user?.bio}
            </motion.p>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4"
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
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 1.4 + index * 0.1
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 md:p-4 rounded-full text-white shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-300 ${social.hoverColor}`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ y: -5 }}
              className="w-full"
            >
              <Link
                to="/about"
                className="block bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <Code className="w-8 h-8 md:w-10 md:h-10 mb-4 text-purple-300 group-hover:text-white transition-colors" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between group-hover:text-purple-200 transition-colors">
                  About
                  <ArrowRight className="transform group-hover:translate-x-2 transition-transform" />
                </h2>
                <p className="text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors">Learn more about my journey and expertise</p>
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
                className="block bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 mb-4 text-purple-300 group-hover:text-white transition-colors" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between group-hover:text-purple-200 transition-colors">
                  Projects
                  <ArrowRight className="transform group-hover:translate-x-2 transition-transform" />
                </h2>
                <p className="text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors">Explore my latest work and contributions</p>
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
                className="block bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <ChartBar className="w-8 h-8 md:w-10 md:h-10 mb-4 text-purple-300 group-hover:text-white transition-colors" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 flex items-center justify-between group-hover:text-purple-200 transition-colors">
                  Stats
                  <ArrowRight className="transform group-hover:translate-x-2 transition-transform" />
                </h2>
                <p className="text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors">View my GitHub and GitLab statistics</p>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8 md:mt-16 px-4"
          >
            {githubUser && (
              <motion.a
                href={`https://github.com/${githubUser.login}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-lg rounded-full px-6 md:px-8 py-3 md:py-4 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Github size={20} className="md:w-6 md:h-6" />
                <span className="font-medium text-sm md:text-base">GitHub Profile</span>
              </motion.a>
            )}
            {gitlabUser && (
              <motion.a
                href={`https://gitlab.com/${gitlabUser.username}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-lg rounded-full px-6 md:px-8 py-3 md:py-4 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <GitlabLogo size={20} className="md:w-6 md:h-6" />
                <span className="font-medium text-sm md:text-base">GitLab Profile</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}