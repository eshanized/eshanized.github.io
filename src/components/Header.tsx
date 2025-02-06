import React from 'react';
import { Github, Gitlab as GitlabLogo, Mail, MapPin, Globe } from 'lucide-react';
import { GitHubUser, GitLabUser } from '../types';

interface HeaderProps {
  githubUser: GitHubUser | null;
  gitlabUser: GitLabUser | null;
}

export function Header({ githubUser, gitlabUser }: HeaderProps) {
  const user = githubUser || gitlabUser;
  if (!user) return null;

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="mb-2 text-4xl font-bold">{user.name}</h1>
            <p className="mb-4 text-xl text-purple-200">{githubUser?.bio || gitlabUser?.bio}</p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              {githubUser && (
                <a
                  href={`https://github.com/${githubUser.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  <Github size={20} />
                  <span>{githubUser.login}</span>
                </a>
              )}
              {gitlabUser && (
                <a
                  href={`https://gitlab.com/${gitlabUser.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  <GitlabLogo size={20} />
                  <span>{gitlabUser.username}</span>
                </a>
              )}
              {user.location && (
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <MapPin size={20} />
                  <span>{user.location}</span>
                </div>
              )}
              {(githubUser?.blog || gitlabUser?.website_url) && (
                <a
                  href={githubUser?.blog || gitlabUser?.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  <Globe size={20} />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
