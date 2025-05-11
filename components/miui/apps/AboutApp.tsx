"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function AboutApp() {
  return (
    <BaseMIUIApp title="About" rightAction="share">
      <div className="p-4 flex flex-col items-center">
        {/* Profile image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500 dark:border-blue-400 bg-gray-200 dark:bg-gray-800 relative">
          <Image
            src="https://github.com/eshanized.png"
            alt={PERSONAL_INFO.name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="96px"
          />
        </div>
        
        {/* Name and title */}
        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">{PERSONAL_INFO.name}</h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-4 text-center">{PERSONAL_INFO.title}</h2>
        
        {/* Bio */}
        <div className="bg-white dark:bg-gray-800/80 rounded-xl p-4 w-full mb-4 shadow-sm backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Bio</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{PERSONAL_INFO.about}</p>
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 w-full mb-4">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="bg-blue-500 dark:bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center transition-colors duration-300 hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>Email</span>
          </a>
          
          <a 
            href={PERSONAL_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 dark:bg-purple-600 text-white rounded-xl p-3 flex items-center justify-center transition-colors duration-300 hover:bg-purple-600 dark:hover:bg-purple-700"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            <span>Website</span>
          </a>
        </div>
        
        {/* Social links */}
        <div className="bg-white dark:bg-gray-800/80 rounded-xl p-4 w-full shadow-sm backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Connect</h3>
          <div className="space-y-3">
            {PERSONAL_INFO.github && (
              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5 mr-3" />
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
            )}
            
            {PERSONAL_INFO.linkedin && (
              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
            )}
            
            {PERSONAL_INFO.twitter && (
              <a 
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5 mr-3" />
                <span>Twitter</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
            )}
          </div>
        </div>
      </div>
    </BaseMIUIApp>
  );
} 