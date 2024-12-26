import { useQuery } from 'react-query';
import { Repository } from '../types';
import { settings } from '../settings';

async function fetchRepositories(): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/users/${settings.githubUsername}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const repos = await response.json();
  
  // Add thumbnails using the GitHub API
  return repos.map((repo: Repository) => ({
    ...repo,
    thumbnail: `https://opengraph.githubassets.com/1/${settings.githubUsername}/${repo.name}`
  }));
}

export function useGitHubRepos() {
  return useQuery<Repository[], Error>('repositories', fetchRepositories, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}