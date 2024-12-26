import { useQuery } from 'react-query';
import { settings } from '../settings';

interface GitHubUser {
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  html_url: string;
  followers: number;
}

async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(
    `https://api.github.com/users/${settings.githubUsername}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }
  return response.json();
}

export function useGitHubUser() {
  return useQuery<GitHubUser, Error>('github-user', fetchGitHubUser, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
}