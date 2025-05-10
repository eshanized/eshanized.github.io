import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to fetch repositories from GitHub
export async function fetchGithubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided',
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated: repo.updated_at,
      created: repo.created_at,
      homepage: repo.homepage,
      source: 'github',
      topics: repo.topics || [],
      is_fork: repo.fork
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Function to fetch repositories from GitLab
export async function fetchGitlabRepos(username: string) {
  try {
    const response = await fetch(`https://gitlab.com/api/v4/users/${username}/projects?order_by=updated_at&per_page=100`);
    if (!response.ok) {
      throw new Error(`GitLab API error: ${response.status}`);
    }
    const data = await response.json();
    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided',
      url: repo.web_url,
      stars: repo.star_count,
      forks: repo.forks_count,
      language: repo.repository_language || null,
      updated: repo.last_activity_at,
      created: repo.created_at,
      homepage: repo.web_url,
      source: 'gitlab',
      topics: repo.tag_list || [],
      is_fork: repo.forked_from_project !== null
    }));
  } catch (error) {
    console.error('Error fetching GitLab repositories:', error);
    return [];
  }
}

// Function to fetch all repositories from both GitHub and GitLab
export async function fetchAllRepositories(username: string) {
  const [githubRepos, gitlabRepos] = await Promise.all([
    fetchGithubRepos(username),
    fetchGitlabRepos(username)
  ]);
  
  // Combine and sort by update date
  return [...githubRepos, ...gitlabRepos].sort((a, b) => 
    new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );
}
