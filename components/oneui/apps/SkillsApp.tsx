"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useOneUITheme } from '../OneUIThemeContext';

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(SKILLS)[0]);
  const { colors } = useOneUITheme();
  
  return (
    <BaseOneUIApp title="Skills">
      <div className={`p-4 ${colors.primary} min-h-full`}>
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
          {Object.keys(SKILLS).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === category
                  ? `${colors.accent} text-white`
                  : `${colors.tertiary} ${colors.textSecondary}`
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills list */}
        <div className="space-y-px">
          {SKILLS[activeTab as keyof typeof SKILLS].map((skill, index) => (
            <div key={index} className={`${colors.cardBg} p-4 border-b ${colors.divider}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-medium ${colors.textPrimary}`}>{skill.name}</h3>
                <span className={`text-sm ${colors.textSecondary}`}>
                  {skill.proficiency}%
                </span>
              </div>
              
              <div className={`h-2 ${colors.tertiary} rounded-md overflow-hidden`}>
                <motion.div
                  className={`h-full ${colors.accent}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseOneUIApp>
  );
} 