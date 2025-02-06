import { motion } from 'framer-motion';
import { MapPin, Globe, Github, Gitlab as GitlabLogo, Code, Briefcase, GraduationCap, Terminal } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 px-4 md:px-8">
      <div className="absolute inset-0 bg-[url('/assets/images/eshanized-bg.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto relative"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          About Me
        </motion.h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {githubUser && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 md:px-6 py-4 flex items-center gap-3">
                <Github className="text-white" size={24} />
                <h2 className="text-lg md:text-xl font-semibold text-white">GitHub Profile</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={githubUser.avatar_url}
                    alt={githubUser.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{githubUser.name}</h3>
                    <p className="text-gray-600">@{githubUser.login}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">{githubUser.bio}</p>
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
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-purple-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Repositories</p>
                      <p className="text-lg md:text-xl font-semibold text-purple-600">{githubUser.public_repos}</p>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Followers</p>
                      <p className="text-lg md:text-xl font-semibold text-purple-600">{githubUser.followers}</p>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Following</p>
                      <p className="text-lg md:text-xl font-semibold text-purple-600">{githubUser.following}</p>
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
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 md:px-6 py-4 flex items-center gap-3">
                <GitlabLogo className="text-white" size={24} />
                <h2 className="text-lg md:text-xl font-semibold text-white">GitLab Profile</h2>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={gitlabUser.avatar_url}
                    alt={gitlabUser.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{gitlabUser.name}</h3>
                    <p className="text-gray-600">@{gitlabUser.username}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">{gitlabUser.bio}</p>
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
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-orange-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Repositories</p>
                      <p className="text-lg md:text-xl font-semibold text-orange-600">{gitlabUser.public_repos}</p>
                    </div>
                    <div className="bg-orange-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Projects</p>
                      <p className="text-lg md:text-xl font-semibold text-orange-600">{gitlabUser.projects_count || 0}</p>
                    </div>
                    <div className="bg-orange-50 px-3 py-2 rounded-lg">
                      <p className="text-xs md:text-sm text-gray-600">Groups</p>
                      <p className="text-lg md:text-xl font-semibold text-orange-600">{gitlabUser.groups_count || 0}</p>
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
          className="max-w-6xl mx-auto mb-8 md:mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-purple-600" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold">Skills & Technologies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                  <Terminal size={18} />
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-purple-600 mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-purple-600 mb-3">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-purple-600 mb-3">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <span
                      key={skill}
                      className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-purple-600 mb-3">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span
                      key={skill}
                      className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs md:text-sm"
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
          className="max-w-6xl mx-auto mb-8 md:mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-purple-600" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold">Work Experience</h2>
            </div>
            <div className="space-y-6 md:space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 md:pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-200"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-600 -translate-x-[3px]" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-purple-600 font-medium text-sm md:text-base">{exp.company}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{exp.period}</p>
                  <p className="text-gray-700 mt-2 text-sm md:text-base">{exp.description}</p>
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
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-purple-600" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold">Education</h2>
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
                  <div className="bg-purple-100 p-2 md:p-3 rounded-lg shrink-0">
                    <GraduationCap className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 text-sm md:text-base">{edu.school}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{edu.period}</p>
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