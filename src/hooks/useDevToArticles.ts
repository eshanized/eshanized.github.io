import { useQuery } from 'react-query';
import { Article } from '../types';
import { settings } from '../settings';

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(
    `https://dev.to/api/articles?username=${settings.devToUsername}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
}

export function useDevToArticles() {
  return useQuery<Article[], Error>('articles', fetchArticles, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}