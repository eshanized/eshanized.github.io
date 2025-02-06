import { motion } from 'framer-motion';
import {
  MapPin,
  Globe,
  Github,
  Gitlab as GitlabLogo,
  Code,
  Briefcase,
  GraduationCap,
  Terminal,
} from 'lucide-react';
import { GitHubUser, GitLabUser } from '../types';

interface AboutProps {
  githubUser: GitHubUser | null;
  gitlabUser: GitLabUser | null;
}

export function About({ githubUser, gitlabUser }: AboutProps) {
  if (!githubUser && !gitlabUser) return null;

  const skills = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'],
    frontend: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Material-UI'],
    backend: ['Node.js', 'Express', 'Django', 'Spring Boot', 'GraphQL'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  };

  const experience = [
    {
      title: 'Chief Executive [Former]',
      company: 'Tonmoy Infrastructure.',
      period: '2018 - 2022',
      description: 'Leading development of scalable applications using modern technologies.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Technology in Aerospace Engineering',
      school: 'Lovely Professional University',
      period: '2019 - 2024',
    },
    {
      degree: 'Associate Bachelor of Science in Computer Science [Artificial Intelligence]',
      school: 'University of The People',
      period: '2022 - 2025',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 md:px-8 md:py-20">
      <div className="absolute inset-0 bg-[url('/assets/images/eshanized-bg.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container relative mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-center text-3xl font-bold text-transparent md:mb-12 md:text-4xl lg:text-5xl"
        >
          About Me
        </motion.h1>

        <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-2">
          {githubUser && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-4 md:px-6">
                <Github className="text-white" size={24} />
                <h2 className="text-lg font-semibold text-white md:text-xl">GitHub Profile</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={githubUser.avatar_url}
                    alt={githubUser.name}
                    className="h-16 w-16 rounded-full border-4 border-white shadow-lg md:h-20 md:w-20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                      {githubUser.name}
                    </h3>
                    <p className="text-gray-600">@{githubUser.login}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 md:text-base">{githubUser.bio}</p>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    {githubUser.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="text-purple-600" size={18} />
                        <span className="text-sm md:text-base">{githubUser.location}</span>
                      </div>
                    )}
                    {githubUser.blog && (
                      <a
                        href={githubUser.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                      >
                        <Globe size={18} />
                        <span className="text-sm md:text-base">Website</span>
                      </a>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-purple-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Repositories</p>
                      <p className="text-lg font-semibold text-purple-600 md:text-xl">
                        {githubUser.public_repos}
                      </p>
                    </div>
                    <div className="rounded-lg bg-purple-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Followers</p>
                      <p className="text-lg font-semibold text-purple-600 md:text-xl">
                        {githubUser.followers}
                      </p>
                    </div>
                    <div className="rounded-lg bg-purple-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Following</p>
                      <p className="text-lg font-semibold text-purple-600 md:text-xl">
                        {githubUser.following}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {gitlabUser && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4 md:px-6">
                <GitlabLogo className="text-white" size={24} />
                <h2 className="text-lg font-semibold text-white md:text-xl">GitLab Profile</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={gitlabUser.avatar_url}
                    alt={gitlabUser.name}
                    className="h-16 w-16 rounded-full border-4 border-white shadow-lg md:h-20 md:w-20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                      {gitlabUser.name}
                    </h3>
                    <p className="text-gray-600">@{gitlabUser.username}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 md:text-base">{gitlabUser.bio}</p>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    {gitlabUser.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="text-orange-600" size={18} />
                        <span className="text-sm md:text-base">{gitlabUser.location}</span>
                      </div>
                    )}
                    {gitlabUser.website_url && (
                      <a
                        href={gitlabUser.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-800"
                      >
                        <Globe size={18} />
                        <span className="text-sm md:text-base">Website</span>
                      </a>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-orange-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Repositories</p>
                      <p className="text-lg font-semibold text-orange-600 md:text-xl">
                        {gitlabUser.public_repos}
                      </p>
                    </div>
                    <div className="rounded-lg bg-orange-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Projects</p>
                      <p className="text-lg font-semibold text-orange-600 md:text-xl">
                        {gitlabUser.projects_count || 0}
                      </p>
                    </div>
                    <div className="rounded-lg bg-orange-50 px-3 py-2">
                      <p className="text-xs text-gray-600 md:text-sm">Groups</p>
                      <p className="text-lg font-semibold text-orange-600 md:text-xl">
                        {gitlabUser.groups_count || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mb-8 max-w-6xl md:mb-12"
        >
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Code className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold md:text-2xl">Skills & Technologies</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-purple-600 md:text-lg">
                  <Terminal size={18} />
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700 md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-purple-600 md:text-lg">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-purple-600 md:text-lg">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700 md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-purple-600 md:text-lg">
                  Databases
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-yellow-700 md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-purple-600 md:text-lg">
                  Tools & DevOps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-700 md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mx-auto mb-8 max-w-6xl md:mb-12"
        >
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold md:text-2xl">Work Experience</h2>
            </div>
            <div className="space-y-6 md:space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-0.5 before:bg-purple-200 before:content-[''] md:pl-8"
                >
                  <div className="absolute left-0 top-0 h-2 w-2 -translate-x-[3px] rounded-full bg-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 md:text-xl">{exp.title}</h3>
                  <p className="text-sm font-medium text-purple-600 md:text-base">{exp.company}</p>
                  <p className="text-xs text-gray-500 md:text-sm">{exp.period}</p>
                  <p className="mt-2 text-sm text-gray-700 md:text-base">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mx-auto max-w-6xl"
        >
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold md:text-2xl">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 rounded-lg bg-purple-100 p-2 md:p-3">
                    <GraduationCap className="h-5 w-5 text-purple-600 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-purple-600 md:text-base">{edu.school}</p>
                    <p className="text-xs text-gray-500 md:text-sm">{edu.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
