"use client";

import React, { useState, useEffect } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { ExternalLink, Github, GitBranch, Star, GitFork, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useOneUITheme } from '../OneUIThemeContext';

// Define project type
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  demoLink?: string;
  tags: string[];
  source: 'github' | 'gitlab';
  stars?: number;
  forks?: number;
}

export default function ProjectsApp() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useOneUITheme();

  // Fetch projects from GitHub and GitLab
  useEffect(() => {
    const username = "eshanized";
    
    async function fetchProjects() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch GitHub repos
        const githubResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!githubResponse.ok) {
          throw new Error(`GitHub API error: ${githubResponse.status}`);
        }
        const githubData = await githubResponse.json();
        
        // Fetch GitLab projects
        const gitlabResponse = await fetch(`https://gitlab.com/api/v4/users/${username}/projects?order_by=updated_at&per_page=10`);
        if (!gitlabResponse.ok) {
          throw new Error(`GitLab API error: ${gitlabResponse.status}`);
        }
        const gitlabData = await gitlabResponse.json();
        
        // Transform GitHub data
        const githubProjects: Project[] = githubData.map((repo: any) => ({
          id: `github-${repo.id}`,
          title: repo.name,
          description: repo.description || 'No description available',
          image: repo.owner.avatar_url,
          link: repo.html_url,
          demoLink: repo.homepage || '',
          tags: [repo.language, 'GitHub'].filter(Boolean),
          source: 'github',
          stars: repo.stargazers_count,
          forks: repo.forks_count
        }));
        
        // Transform GitLab data
        const gitlabProjects: Project[] = gitlabData.map((project: any) => ({
          id: `gitlab-${project.id}`,
          title: project.name,
          description: project.description || 'No description available',
          image: project.avatar_url || 'https://gitlab.com/uploads/-/system/user/avatar/10859775/avatar.png',
          link: project.web_url,
          demoLink: '',
          tags: ['GitLab'].concat(project.tag_list || []),
          source: 'gitlab',
          stars: project.star_count,
          forks: project.forks_count
        }));
        
        // Combine and sort projects by most recently updated
        const allProjects = [...githubProjects, ...gitlabProjects];
        setProjects(allProjects);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(`Error fetching projects: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  return (
    <BaseOneUIApp title="Projects" rightAction="more">
      <div className={`p-4 ${colors.primary} min-h-full`}>
        <h1 className={`text-xl font-medium mb-4 ${colors.textPrimary}`}>My Projects</h1>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className={`w-8 h-8 animate-spin ${colors.accent} mb-2`} />
            <p className={`${colors.textSecondary}`}>Loading projects...</p>
          </div>
        )}
        
        {error && (
          <div className={`p-4 border ${colors.divider} rounded-md text-red-500 mb-4`}>
            {error}
          </div>
        )}
        
        {!isLoading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className={`${colors.textSecondary}`}>No projects found</p>
          </div>
        )}
        
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`${colors.cardBg} border ${colors.divider} overflow-hidden`}
            >
              {/* Project image */}
              <div className="w-full h-48 relative">
                <Image 
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={`absolute top-2 right-2 ${colors.accent} bg-opacity-80 rounded-md px-2 py-0.5 text-xs text-white`}>
                  {project.source === 'github' ? 'GitHub' : 'GitLab'}
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-4">
                <h2 className={`text-lg font-medium ${colors.textPrimary}`}>{project.title}</h2>
                <p className={`${colors.textSecondary} text-sm mt-2`}>
                  {project.description}
                </p>
                
                {/* Project stats */}
                <div className="flex gap-3 mt-3">
                  {project.stars !== undefined && (
                    <div className={`flex items-center text-xs ${colors.textSecondary}`}>
                      <Star className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                      {project.stars}
                    </div>
                  )}
                  {project.forks !== undefined && (
                    <div className={`flex items-center text-xs ${colors.textSecondary}`}>
                      <GitFork className="w-3.5 h-3.5 mr-1" />
                      {project.forks}
                    </div>
                  )}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.filter(Boolean).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2.5 py-0.5 ${colors.tertiary} ${colors.textPrimary} rounded-md text-xs`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center px-4 py-2 ${colors.tertiary} rounded-md text-sm ${colors.textPrimary}`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span>Code</span>
                  </a>
                  
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center px-4 py-2 ${colors.accent} text-white rounded-md text-sm`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseOneUIApp>
  );
} 