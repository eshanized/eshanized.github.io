import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import ProjectHeader from '../components/projects/ProjectHeader';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { filterRepositories } from '../utils/filter';

function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'updated'>('updated');
  
  const { data: repos = [], isLoading, error } = useGitHubRepos();
  
  const languages = useMemo(() => {
    const langSet = new Set(repos.map(repo => repo.language).filter(Boolean));
    return Array.from(langSet).sort();
  }, [repos]);
  
  const filteredProjects = useMemo(() => {
    let filtered = filterRepositories(repos, searchQuery, selectedLanguage);
    
    return filtered.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [repos, searchQuery, selectedLanguage, sortBy]);

  return (
    <Layout
      title="Projects"
      description="Explore my open source projects and contributions"
    >
      <div className="max-w-6xl mx-auto">
        <ProjectHeader />
        
        <ProjectFilters
          languages={languages}
          selectedLanguage={selectedLanguage}
          searchQuery={searchQuery}
          onLanguageChange={setSelectedLanguage}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
        />
        
        <ProjectGrid
          projects={filteredProjects}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </Layout>
  );
}

export default Projects;