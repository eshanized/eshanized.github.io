"use client";

import { useState, useEffect } from 'react';
import { PROJECTS } from '@/lib/constants';
import { fetchAllRepositories } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink, Github, GitBranch, Star, Calendar, GitFork, Gitlab } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

// Repository type definition
type Repository = {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updated: string;
  created: string;
  homepage: string | null;
  source: 'github' | 'gitlab';
  topics: string[];
  is_fork: boolean;
};

export default function ProjectsApp() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [filter, setFilter] = useState<'all' | 'github' | 'gitlab' | 'original'>('all');

  // Fetch repositories when component mounts
  useEffect(() => {
    async function loadRepositories() {
      setIsLoading(true);
      try {
        const repos = await fetchAllRepositories('eshanized');
        setRepositories(repos);
        if (repos.length > 0) {
          setSelectedRepo(repos[0]);
        }
      } catch (error) {
        console.error('Error loading repositories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadRepositories();
  }, []);

  // Filter repositories based on selected filter
  const filteredRepos = repositories.filter(repo => {
    if (filter === 'all') return true;
    if (filter === 'github') return repo.source === 'github';
    if (filter === 'gitlab') return repo.source === 'gitlab';
    if (filter === 'original') return !repo.is_fork;
    return true;
  });

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get language badge color
  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400',
      TypeScript: 'bg-blue-400/20 text-blue-700 dark:text-blue-400',
      Python: 'bg-green-400/20 text-green-700 dark:text-green-400',
      Java: 'bg-red-400/20 text-red-700 dark:text-red-400',
      HTML: 'bg-orange-400/20 text-orange-700 dark:text-orange-400',
      CSS: 'bg-purple-400/20 text-purple-700 dark:text-purple-400',
      PHP: 'bg-indigo-400/20 text-indigo-700 dark:text-indigo-400',
      Ruby: 'bg-red-500/20 text-red-700 dark:text-red-500',
      Go: 'bg-cyan-400/20 text-cyan-700 dark:text-cyan-400',
      Rust: 'bg-amber-500/20 text-amber-700 dark:text-amber-500',
      C: 'bg-gray-400/20 text-gray-700 dark:text-gray-400',
      'C++': 'bg-pink-400/20 text-pink-700 dark:text-pink-400',
      'C#': 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-400',
    };
    
    return language ? colors[language] || 'bg-gray-400/20 text-gray-700 dark:text-gray-400' : 'bg-gray-400/20 text-gray-700 dark:text-gray-400';
  };

  return (
    <div className="h-full p-6 overflow-auto bg-background">
      <Tabs defaultValue="repositories" className="w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Projects & Repositories</h2>
          <TabsList>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="grid">Featured</TabsTrigger>
            <TabsTrigger value="featured">Details</TabsTrigger>
          </TabsList>
        </div>

        {/* Repositories Tab - Shows GitHub and GitLab repos */}
        <TabsContent value="repositories" className="w-full">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="h-[150px] w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setFilter('all')}
                >
                  All Repositories ({repositories.length})
                </Badge>
                <Badge 
                  variant={filter === 'github' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setFilter('github')}
                >
                  <Github className="w-3 h-3 mr-1" /> GitHub ({repositories.filter(r => r.source === 'github').length})
                </Badge>
                <Badge 
                  variant={filter === 'gitlab' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setFilter('gitlab')}
                >
                  <Gitlab className="w-3 h-3 mr-1" /> GitLab ({repositories.filter(r => r.source === 'gitlab').length})
                </Badge>
                <Badge 
                  variant={filter === 'original' ? 'default' : 'outline'} 
                  className="cursor-pointer" 
                  onClick={() => setFilter('original')}
                >
                  Original ({repositories.filter(r => !r.is_fork).length})
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Repository list */}
                <div className="md:w-3/5">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredRepos.length > 0 ? (
                      filteredRepos.map((repo) => (
                        <motion.div
                          key={`${repo.source}-${repo.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSelectedRepo(repo)}
                          className={`border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer ${
                            selectedRepo?.id === repo.id && selectedRepo?.source === repo.source 
                              ? 'border-primary bg-primary/5' 
                              : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                {repo.source === 'github' ? (
                                  <Github className="w-4 h-4 mr-2 text-muted-foreground" />
                                ) : (
                                  <Gitlab className="w-4 h-4 mr-2 text-muted-foreground" />
                                )}
                                <h3 className="font-medium">{repo.name}</h3>
                                {repo.is_fork && (
                                  <Badge variant="outline" className="ml-2 text-xs">Fork</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{repo.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground gap-3 flex-wrap">
                            {repo.language && (
                              <span className={`flex items-center ${getLanguageColor(repo.language)}`}>
                                <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" /> {repo.stars}
                            </span>
                            <span className="flex items-center">
                              <GitFork className="w-3 h-3 mr-1" /> {repo.forks}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" /> Updated {formatDate(repo.updated)}
                            </span>
                          </div>
                          
                          {repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {repo.topics.slice(0, 4).map((topic, i) => (
                                <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0">
                                  {topic}
                                </Badge>
                              ))}
                              {repo.topics.length > 4 && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  +{repo.topics.length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        No repositories found for the selected filter.
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Repository details */}
                <div className="md:w-2/5">
                  {selectedRepo ? (
                    <motion.div
                      key={`${selectedRepo.source}-${selectedRepo.id}-details`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border rounded-lg p-6 sticky top-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {selectedRepo.source === 'github' ? (
                            <Github className="w-5 h-5 mr-2" />
                          ) : (
                            <Gitlab className="w-5 h-5 mr-2" />
                          )}
                          <h2 className="text-xl font-bold">{selectedRepo.name}</h2>
                        </div>
                        {selectedRepo.is_fork && (
                          <Badge variant="outline">Forked Repository</Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{selectedRepo.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Stars</h3>
                          <p className="flex items-center font-medium">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" /> {selectedRepo.stars}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Forks</h3>
                          <p className="flex items-center font-medium">
                            <GitFork className="w-4 h-4 mr-1" /> {selectedRepo.forks}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Created</h3>
                          <p className="font-medium">{formatDate(selectedRepo.created)}</p>
                        </div>
                        <div>
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Last Updated</h3>
                          <p className="font-medium">{formatDate(selectedRepo.updated)}</p>
                        </div>
                        {selectedRepo.language && (
                          <div>
                            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Language</h3>
                            <p className={`flex items-center font-medium ${getLanguageColor(selectedRepo.language)}`}>
                              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                              {selectedRepo.language}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {selectedRepo.topics.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Topics</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedRepo.topics.map((topic, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-4">
                        <a 
                          href={selectedRepo.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          {selectedRepo.source === 'github' ? (
                            <Github className="w-4 h-4 mr-2" />
                          ) : (
                            <Gitlab className="w-4 h-4 mr-2" />
                          )}
                          View Repository
                        </a>
                        {selectedRepo.homepage && (
                          <a 
                            href={selectedRepo.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="border rounded-lg p-6 text-center text-muted-foreground">
                      Select a repository to view details
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="grid" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fill
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Source
                    </a>
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="w-full">
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* Project selection sidebar */}
            <div className="md:w-1/3 space-y-3">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveProject(project)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200
                    ${activeProject.title === project.title 
                      ? 'bg-primary/10 border-l-4 border-primary' 
                      : 'hover:bg-muted border-l-4 border-transparent'
                    }`}
                >
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Active project details */}
            <div className="md:w-2/3">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-80">
                  <Image 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6 flex-1">
                  <h2 className="text-2xl font-bold mb-4">{activeProject.title}</h2>
                  <p className="mb-6 text-muted-foreground">{activeProject.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={activeProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source
                    </a>
                    <a 
                      href={activeProject.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}