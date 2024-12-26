import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/date';

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    period: { start: '2021-01', end: 'Present' },
    description: 'Led development of modern web applications using React and TypeScript.',
    achievements: [
      'Improved application performance by 40%',
      'Led a team of 5 developers',
      'Implemented CI/CD pipeline'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions',
    location: 'New York, NY',
    period: { start: '2018-06', end: '2020-12' },
    description: 'Developed full-stack applications using Node.js and React.',
    achievements: [
      'Built scalable microservices architecture',
      'Reduced server costs by 30%',
      'Mentored junior developers'
    ]
  }
];

function Experience() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">Experience</h2>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-primary-200 dark:before:bg-nord-polar-2"
          >
            <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary-500 dark:bg-nord-frost-2 transform -translate-x-1/2" />
            <div className="bg-white dark:bg-nord-polar-1 rounded-xl p-6 shadow-lg dark:shadow-nord-polar-2/10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-nord-snow-1">{experience.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-nord-snow-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(experience.period.start)} - {experience.period.end === 'Present' ? 'Present' : formatDate(experience.period.end)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-nord-snow-2">
                  <Briefcase className="w-4 h-4 text-primary-500 dark:text-nord-frost-2" />
                  <span>{experience.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-nord-snow-2">
                  <MapPin className="w-4 h-4 text-primary-500 dark:text-nord-frost-2" />
                  <span>{experience.location}</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-nord-snow-2 mb-4">{experience.description}</p>
              
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-nord-snow-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-nord-frost-2" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Experience;