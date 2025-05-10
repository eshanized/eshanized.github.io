"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(SKILLS)[0]);
  
  return (
    <BaseIOSApp title="Skills">
      <div className="p-4">
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
          {Object.keys(SKILLS).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills list */}
        <div className="space-y-4">
          {SKILLS[activeTab as keyof typeof SKILLS].map((skill, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.proficiency}%
                </span>
              </div>
              
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseIOSApp>
  );
} 