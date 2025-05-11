"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { EDUCATION } from '@/lib/constants';
import { Calendar, GraduationCap } from 'lucide-react';

export default function EducationApp() {
  return (
    <BaseMIUIApp title="Education">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Education</h1>
        
        <div className="space-y-6">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-blue-500 w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{edu.degree}</h2>
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">{edu.institution}</h3>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{edu.period}</span>
                  </div>
                  
                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {EDUCATION.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <GraduationCap className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">No education information found.</p>
          </div>
        )}
      </div>
    </BaseMIUIApp>
  );
} 