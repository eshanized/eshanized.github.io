import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, Calendar } from 'lucide-react';
import { Repository } from '../../types';
import { formatRelativeDate } from '../../utils/date';

interface ProjectCardProps {
  project: Repository;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const thumbnailUrl = project.thumbnail || `https://source.unsplash.com/800x600/?${encodeURIComponent(project.name.replace(/-/g, ' '))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-nord-polar-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-nord-polar-3 overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white">
              <Star className="w-4 h-4" />
              {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-white">
              <GitFork className="w-4 h-4" />
              {project.forks_count}
            </span>
          </div>
          <span className="flex items-center gap-1 text-white text-sm">
            <Calendar className="w-4 h-4" />
            {formatRelativeDate(project.updated_at)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-nord-snow-1 mb-2">
          {project.name}
        </h3>
        
        <p className="text-gray-600 dark:text-nord-snow-2 mb-4 line-clamp-2 min-h-[3rem]">
          {project.description || 'No description provided'}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.topics.map(topic => (
            <span 
              key={topic}
              className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-nord-polar-3 text-primary-700 dark:text-nord-frost-2"
            >
              #{topic}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-nord-polar-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-500 dark:bg-nord-frost-2"></span>
            <span className="text-sm text-gray-600 dark:text-nord-snow-2">
              {project.language}
            </span>
          </div>
          
          <div className="flex gap-3">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-primary-100 dark:bg-nord-polar-3 text-primary-700 dark:text-nord-frost-2 hover:bg-primary-200 dark:hover:bg-nord-polar-4 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-primary-100 dark:bg-nord-polar-3 text-primary-700 dark:text-nord-frost-2 hover:bg-primary-200 dark:hover:bg-nord-polar-4 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;