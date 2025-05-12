"use client";

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { User, Laptop, Cloud, Code, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '@/lib/constants';

export default function AboutApp() {
  const { theme } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-full p-6 space-y-8">
      {/* Hero Section */}
      <motion.section 
        {...fadeInUp}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {TERMINAL_COMMANDS.about}
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        {...fadeInUp}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TERMINAL_COMMANDS.skills.split(',').map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {skill.trim()}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        {...fadeInUp}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Laptop className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TERMINAL_COMMANDS.projects.split('\n\n').map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20"
            >
              {project}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        {...fadeInUp}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-colors"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </a>
        </div>
      </motion.section>
    </div>
  );
}