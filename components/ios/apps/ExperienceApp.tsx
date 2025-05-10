"use client";

import React from 'react';
import BaseIOSApp from './BaseIOSApp';
import { EXPERIENCE } from '@/lib/constants';
import { Briefcase, Calendar } from 'lucide-react';

export default function ExperienceApp() {
  return (
    <BaseIOSApp title="Experience">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Work Experience</h1>
        
        <div className="space-y-6">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Briefcase className="text-blue-500 w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{job.position}</h2>
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">{job.company}</h3>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{job.period}</span>
                  </div>
                  
                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {EXPERIENCE.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <Briefcase className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">No work experience found.</p>
          </div>
        )}
      </div>
    </BaseIOSApp>
  );
} 