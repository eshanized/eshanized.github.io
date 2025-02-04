export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitLabUser {
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  website_url: string;
  location: string;
  public_repos: number;
  projects_count?: number;
  groups_count?: number;
}

export interface Repository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  source: 'github' | 'gitlab';
  updated_at: string; // Add this field
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  positive_reactions_count: number;
  comments_count: number;
}

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  thumbnail: string;
  categories: string[];
}