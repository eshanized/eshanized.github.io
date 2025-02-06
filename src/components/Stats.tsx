import React from 'react';
import { GitHubUser, GitLabUser } from '../types';

interface StatsProps {
  githubUser: GitHubUser | null;
  gitlabUser: GitLabUser | null;
}

export function Stats({ githubUser, gitlabUser }: StatsProps) {
  const totalRepos = (githubUser?.public_repos || 0) + (gitlabUser?.public_repos || 0);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-purple-700">{totalRepos}</div>
            <div className="text-gray-600">Total Repositories</div>
          </div>
          {githubUser && (
            <>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-purple-700">
                  {githubUser.followers}
                </div>
                <div className="text-gray-600">GitHub Followers</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-purple-700">
                  {githubUser.following}
                </div>
                <div className="text-gray-600">GitHub Following</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
