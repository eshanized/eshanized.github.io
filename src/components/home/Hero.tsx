import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Users, Star } from 'lucide-react';
import { settings } from '../../settings';
import { useGitHubUser  } from '../../hooks/useGitHubUser';
import LoadingSkeleton from '../LoadingSkeleton';
import TypeWriter from '../common/TypeWriter';
import BackgroundPattern from './BackgroundPattern';
import StatsCard from './StatsCard';

function Hero() {
  const { data: githubUser , isLoading, error } = useGitHubUser ();
  const { social } = settings.personalInfo;
  const [showRole, setShowRole] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col-reverse md:flex-row items-center justify-between py-16 gap-8">
        <div className="flex-1">
          <LoadingSkeleton className="h-12 w-3/4 mb-4" />
          <LoadingSkeleton className="h-8 w-1/2 mb-6" />
          <LoadingSkeleton className="h-24 w-full mb-8" />
          <LoadingSkeleton className="h-8 w-32" />
        </div>
        <LoadingSkeleton type="circle" className="w-48 h-48 md:w-64 md:h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Error loading profile: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center">
      <BackgroundPattern />
      
      <div className="w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-nord-polar-3 text-primary-600 dark:text-nord-frost-2 text-sm font-medium"
          >
            🤗 Welcome to my portfolio
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">
              {githubUser ?.name}
            </span>
          </motion.h1>

          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 min-h-[2.5rem]">
            {!showRole ? (
              <TypeWriter 
                text={settings.personalInfo.title}
                speed={80}
                className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent"
                onComplete={() => setShowRole(true)}
              />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent"
              >
                {settings.personalInfo.title}
              </motion.span>
            )}
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            {githubUser ?.bio || settings.personalInfo.bio}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4"
          >
            <SocialLink href={social.github} icon={Github} label="GitHub" />
            <SocialLink href={social.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialLink href={social.twitter} icon={Twitter} label="Twitter" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <StatsCard
              icon={<Users className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />}
              label="GitHub Followers"
              value={githubUser ?.followers || 0}
              delay={0.9}
            />
            <StatsCard
              icon={<Star className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />}
              label="Total Stars"
              value="1.2k"
              delay={1.1}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-primary-300/20 dark:from-nord-frost-1/20 dark:to-nord-frost-2/20 rounded-full blur-3xl" />
          <img
            src={githubUser ?.avatar_url}
            alt={githubUser ?.name}
            className="relative w-48 h-48 md:w-80 md:h-80 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-nord-polar-2"
          />
        </motion.div>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.FC<{ size?: string | number }>; // Updated to accept string or number
  label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 bg-white dark:bg-nord-polar-2 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-nord-polar-3"
      aria-label={label}
    >
      <Icon size={24} />
    </a>
  );
}

export default Hero;