import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  BarChart,
  FolderGit2,
  Image,
  BookOpen,
  Mail,
  Menu,
  X,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLink } from './AnimatedButton';

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/about', icon: User, label: 'About' },
    { to: '/projects', icon: FolderGit2, label: 'Projects' },
    { to: '/articles', icon: BookOpen, label: 'Articles' },
    { to: '/stats', icon: BarChart, label: 'Stats' },
    { to: '/gallery', icon: Image, label: 'Gallery' },
    { to: '/contact', icon: Mail, label: 'Contact' },
    { to: '/donate', icon: Heart, label: 'Donate' },
  ];

  const navVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 transform rounded-2xl border border-white/20 bg-white/90 px-4 py-6 shadow-2xl backdrop-blur-xl lg:block"
        style={{
          WebkitBackdropFilter: 'blur(12px)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <motion.ul className="flex flex-col items-center gap-3">
          {links.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <motion.li
                key={to}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={to} className="group relative flex items-center p-2">
                  <motion.div
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'scale-100 bg-purple-100'
                        : 'scale-0 bg-purple-50/0 group-hover:scale-100 group-hover:bg-purple-50'
                    }`}
                    layoutId="navBackground"
                  />
                  <motion.span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'
                    }`}
                  >
                    <Icon size={24} />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute left-full ml-4 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-700'
                    } border border-purple-100/50 shadow-lg`}
                  >
                    {label}
                  </motion.span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Floating Action Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg"
        >
          <Menu size={24} />
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed bottom-20 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-purple-100/20 bg-white p-4 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
                  <h2 className="text-lg font-semibold text-purple-600">Navigation</h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1 text-gray-500 hover:bg-purple-50"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <nav>
                  <ul className="space-y-1">
                    {links.map(({ to, icon: Icon, label }) => {
                      const isActive = location.pathname === to;
                      return (
                        <motion.li key={to} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            to={to}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                              isActive
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-600 hover:bg-purple-50'
                            }`}
                          >
                            <Icon size={20} />
                            <span className="font-medium">{label}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed bottom-8 left-8 z-0 hidden lg:block"
      >
        <AnimatedLink
          href="https://github.com/eshanized"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-purple-100/20 bg-white/90 px-6 py-3 text-sm text-gray-600 shadow-lg backdrop-blur-xl transition-all duration-200 hover:text-purple-600"
          style={{
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="text-purple-600">designed with ❤️ by</span>
          <span className="font-semibold group-hover:text-purple-600">eshanized</span>
        </AnimatedLink>
      </motion.div>
    </>
  );
}
