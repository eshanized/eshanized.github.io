import React from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';
import { useGitHubUser } from '../hooks/useGitHubUser';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function Layout({ children, title, description }: LayoutProps) {
  const { data: githubUser } = useGitHubUser();

  React.useEffect(() => {
    if (githubUser?.avatar_url) {
      // Update favicon
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = githubUser.avatar_url;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [githubUser]);

  return (
    <>
      <SEO title={title} description={description} />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 pt-20 pb-12 min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}

export default Layout;