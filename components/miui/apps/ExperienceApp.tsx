"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { EXPERIENCE } from '@/lib/constants';
import { Briefcase, Calendar } from 'lucide-react';
import { useMIUITheme } from '../MIUIThemeContext';

export default function ExperienceApp() {
  const { colors } = useMIUITheme();
  
  return (
    <BaseMIUIApp title="Experience">
      <div className={`p-4 ${colors.primary} min-h-full`}>
        <h1 className={`text-xl font-medium mb-4 ${colors.textPrimary}`}>Work Experience</h1>
        
        <div className="space-y-px">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className={`${colors.cardBg} p-4 border-b ${colors.divider}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-10 h-10 ${colors.tertiary} rounded-md flex items-center justify-center`}>
                    <Briefcase className={`${colors.accent} w-5 h-5`} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className={`font-medium text-base ${colors.textPrimary}`}>{job.position}</h2>
                  <h3 className={`${colors.textSecondary} font-normal`}>{job.company}</h3>
                  
                  <div className={`flex items-center mt-2 text-sm ${colors.textSecondary}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{job.period}</span>
                  </div>
                  
                  <p className={`mt-3 ${colors.textSecondary}`}>
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {EXPERIENCE.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-12 ${colors.textSecondary}`}>
            <Briefcase className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">No work experience found.</p>
          </div>
        )}
      </div>
    </BaseMIUIApp>
  );
} 