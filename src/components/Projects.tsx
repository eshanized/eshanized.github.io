import React from 'react';
import { Star, GitFork, Github, Gitlab as GitlabLogo } from 'lucide-react';
import { Repository } from '../types';

interface ProjectsProps {
  repositories: Repository[];
}

export function Projects({ repositories }: ProjectsProps) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repositories.map((repo) => (
            <a
              key={`${repo.source}-${repo.name}`}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                {repo.source === 'github' ? (
                  <Github className="text-gray-600" size={24} />
                ) : (
                  <GitlabLogo className="text-gray-600" size={24} />
                )}
                <h3 className="font-semibold text-lg">{repo.name}</h3>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{repo.description}</p>
              <div className="flex items-center gap-4">
                {repo.language && (
                  <span className="text-sm text-gray-500">{repo.language}</span>
                )}
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{repo.forks_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}