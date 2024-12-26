import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

function ProjectHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-nord-polar-3 text-primary-600 dark:text-nord-frost-2 text-sm font-medium mb-4">
        <Code2 size={16} />
        <span>My Work</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Explore my latest projects and contributions to the open-source community
      </p>
    </motion.div>
  );
}

export default ProjectHeader;