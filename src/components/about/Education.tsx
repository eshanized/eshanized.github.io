import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const education = [
  {
    degree: 'Associate Bachelor(Assoc. BSc.) in Computer Science',
    school: 'University of The People',
    year: '2025',
    description: 'Specialized in Artificial Intelligence & Cyber Security',
    achievements: [
      'Graduated with Honors',
      'Published research paper on distributed systems',
      'Teaching Assistant for Advanced Algorithms'
    ]
  },
  {
    degree: 'Bachelor of Technology (B.TECH) in Aerospace Engineering',
    school: 'Lovely Professional University',
    year: '2024',
    description: 'Focus on Aerodynamics & Thermal Engineering',
    achievements: [
      'Failed in 1st Semester',
      'Working on Aerodynamics',
      'Worked in capstone'
    ]
  }
];

function Education() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-500 dark:from-nord-frost-1 dark:to-nord-frost-2 bg-clip-text text-transparent">
        Education
      </h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
            className="bg-white dark:bg-nord-polar-1 rounded-2xl p-6 shadow-xl dark:shadow-nord-polar-2/20 border border-gray-100 dark:border-nord-polar-2 transition-transform transform hover:scale-105 hover:shadow-2xl hover:dark:shadow-nord-polar-3"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 p-4 bg-primary-100 dark:bg-nord-polar-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110">
                <GraduationCap className="w-8 h-8 text-primary-500 dark:text-nord-frost-2" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-nord-snow-1">{edu.degree}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-nord-snow-2">
                    <Calendar className="w-5 h-5 text-primary-500 dark:text-nord-frost-2" />
                    <span>{edu.year}</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-nord-snow-2 mb-2">{edu.school}</p>
                <p className="text-gray-600 dark:text-nord-snow-2 mb-4">{edu.description}</p>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-nord-snow-1 flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary-500 dark:text-nord-frost-2" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className="flex items-center gap-3 text-gray-600 dark:text-nord-snow-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-nord-frost-2" />
                        {achievement}
                      </motion.li>
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
