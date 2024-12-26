import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

function Skills() {
  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to bring ideas to life
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.category} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: {
    category: string;
    icon: React.FC<{ size?: string | number }>; // Updated to accept string or number
    items: {
      name: string;
      icon: React.FC<{ size?: string | number }>; // Updated to accept string or number
    }[];
  };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const CategoryIcon = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-6 bg-white dark:bg-nord-polar-2 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-nord-polar-3"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 dark:bg-nord-polar-3 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-nord-polar-4 transition-colors">
          <CategoryIcon size={24} />
        </div>
        <h3 className="text-xl font-semibold">{skill.category}</h3>
      </div>
      
      <ul className="space-y-4">
        {skill.items.map((item) => {
          const ItemIcon = item.icon;
          return (
            <li 
              key={item.name} 
              className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
            >
              <span className="text-primary-500 dark:text-nord-frost-2">
                <ItemIcon size={16} />
              </span>
              {item.name}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default Skills;