"use client";

import React from 'react';
import BaseIOSApp from './BaseIOSApp';
import Image from 'next/image';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function AboutApp() {
  return (
    <BaseIOSApp title="About" rightAction="share">
      <div className="p-4 flex flex-col items-center">
        {/* Profile image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500 bg-gray-200">
          {/* Using a placeholder image since avatarUrl isn't available */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-2xl font-bold">{PERSONAL_INFO.name.charAt(0)}</span>
          </div>
        </div>
        
        {/* Name and title */}
        <h1 className="text-xl font-bold text-center">{PERSONAL_INFO.name}</h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-4 text-center">{PERSONAL_INFO.title}</h2>
        
        {/* Bio */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full mb-4 shadow-sm">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{PERSONAL_INFO.about}</p>
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 w-full mb-4">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="bg-blue-500 text-white rounded-xl p-3 flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>Email</span>
          </a>
          
          <a 
            href={PERSONAL_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 text-white rounded-xl p-3 flex items-center justify-center"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            <span>Website</span>
          </a>
        </div>
        
        {/* Social links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full shadow-sm">
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="space-y-3">
            {PERSONAL_INFO.github && (
              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <Github className="w-5 h-5 mr-3" />
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            )}
            
            {PERSONAL_INFO.linkedin && (
              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            )}
            
            {PERSONAL_INFO.twitter && (
              <a 
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <Twitter className="w-5 h-5 mr-3" />
                <span>Twitter</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            )}
          </div>
        </div>
      </div>
    </BaseIOSApp>
  );
} 