import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Articles } from './pages/Articles';
import { Stats } from './pages/Stats';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { Navigation } from './components/Navigation';
import { GitHubUser, GitLabUser, Repository } from './types';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [gitlabUser, setGitlabUser] = useState<GitLabUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USERNAME = 'eshanized';
  const GITLAB_USERNAME = 'eshanized';
  const DEVTO_USERNAME = 'eshanized';
  const MEDIUM_USERNAME = '@eshanized';

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch GitHub user and repositories
        const githubUserResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const githubUserData = await githubUserResponse.json();
        setGithubUser(githubUserData);

        const githubReposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        const githubRepos = await githubReposResponse.json();

        // Fetch GitLab user and repositories
        const gitlabUserResponse = await fetch(
          `https://gitlab.com/api/v4/users?username=${GITLAB_USERNAME}`
        );
        const [gitlabUserData] = await gitlabUserResponse.json();
        setGitlabUser(gitlabUserData);

        const gitlabReposResponse = await fetch(
          `https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects`
        );
        const gitlabRepos = await gitlabReposResponse.json();

        // Combine and format repositories
        const formattedGithubRepos: Repository[] = githubRepos.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          source: 'github' as const,
          updated_at: repo.updated_at,
        }));

        const formattedGitlabRepos: Repository[] = gitlabRepos.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.web_url,
          language: repo.language,
          stargazers_count: repo.star_count,
          forks_count: repo.forks_count,
          source: 'gitlab' as const,
          updated_at: repo.last_activity_at,
        }));

        const allRepos = [...formattedGithubRepos, ...formattedGitlabRepos].sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        setRepositories(allRepos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p className="mb-2 text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 transition-colors duration-300">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home githubUser={githubUser} gitlabUser={gitlabUser} />} />
            <Route
              path="/about"
              element={<About githubUser={githubUser} gitlabUser={gitlabUser} />}
            />
            <Route path="/projects" element={<Projects repositories={repositories} />} />
            <Route
              path="/articles"
              element={<Articles devtoUsername={DEVTO_USERNAME} mediumUsername={MEDIUM_USERNAME} />}
            />
            <Route
              path="/stats"
              element={<Stats githubUser={githubUser} gitlabUser={gitlabUser} />}
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </AnimatePresence>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
