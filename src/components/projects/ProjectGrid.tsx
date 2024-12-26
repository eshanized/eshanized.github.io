import React from 'react';
import { Repository } from '../../types';
import ProjectCard from './ProjectCard';
import LoadingSkeleton from '../LoadingSkeleton';

interface ProjectGridProps {
  projects: Repository[];
  isLoading: boolean;
  error: Error | null;
}

function ProjectGrid({ projects, isLoading, error }: ProjectGridProps) {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">
          Error loading projects: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoadingSkeleton type="card" count={6} />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;