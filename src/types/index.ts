export interface UserSettings {
  githubUsername: string;
  devToUsername: string;
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    location: string;
    email: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      devto: string;
    };
  };
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  thumbnail?: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  positive_reactions_count: number;
  tags: string[] | string;
  cover_image: string | null;
}