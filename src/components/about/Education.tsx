import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const education = [
  {
    degree: 'Master of Computer Science',
    school: 'Tech University',
    year: '2018',
    description: 'Specialized in Software Engineering and Distributed Systems',
    achievements: [
      'Graduated with Honors',
      'Published research paper on distributed systems',
      'Teaching Assistant for Advanced Algorithms'
    ]
  },
  {
    degree: 'Bachelor of Computer Science',
    school: 'State University',
    year: '2016',
    description: 'Focus on Web Development and Algorithms',
    achievements: [
      'Dean\'s List all semesters',
      'Led Computer Science Club',
      'Won Hackathon 2015'
    ]
  }
];

function Education() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">Education</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-nord-polar-1 rounded-xl p-6 shadow-lg dark:shadow-nord-polar-2/10 border border-gray-100 dark:border-nord-polar-2"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-nord-polar-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary-500 dark:text-nord-frost-2" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-nord-snow-1">{edu.degree}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-nord-snow-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.year}</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-nord-snow-2 mb-2">{edu.school}</p>
                <p className="text-gray-600 dark:text-nord-snow-2 mb-4">{edu.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-nord-snow-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary-500 dark:text-nord-frost-2" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-nord-snow-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-nord-frost-2" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Education;