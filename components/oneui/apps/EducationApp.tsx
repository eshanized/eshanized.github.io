"use client";

import React from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { EDUCATION } from '@/lib/constants';
import { Calendar, GraduationCap } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';

export default function EducationApp() {
  const { colors } = useOneUITheme();
  
  return (
    <BaseOneUIApp title="Education">
      <div className={`p-4 ${colors.primary} min-h-full`}>
        <h1 className={`text-xl font-medium mb-4 ${colors.textPrimary}`}>Education</h1>
        
        <div className="space-y-px">
          {EDUCATION.map((edu, index) => (
            <div key={index} className={`${colors.cardBg} p-4 border-b ${colors.divider}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-10 h-10 ${colors.tertiary} rounded-md flex items-center justify-center`}>
                    <GraduationCap className={`${colors.accent} w-5 h-5`} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className={`font-medium text-base ${colors.textPrimary}`}>{edu.degree}</h2>
                  <h3 className={`${colors.textSecondary} font-normal`}>{edu.institution}</h3>
                  
                  <div className={`flex items-center mt-2 text-sm ${colors.textSecondary}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{edu.period}</span>
                  </div>
                  
                  <p className={`mt-3 ${colors.textSecondary}`}>
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {EDUCATION.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-12 ${colors.textSecondary}`}>
            <GraduationCap className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">No education information found.</p>
          </div>
        )}
      </div>
    </BaseOneUIApp>
  );
} 