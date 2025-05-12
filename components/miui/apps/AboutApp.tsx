"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { useMIUITheme } from '../MIUIThemeContext';

export default function AboutApp() {
  const { colors } = useMIUITheme();

  return (
    <BaseMIUIApp title="About" rightAction="share">
      <div className={`${colors.primary} min-h-full`}>
        {/* Profile image and basic info */}
        <div className={`${colors.cardBg} p-4 flex flex-col items-center border-b ${colors.divider}`}>
          {/* Profile image */}
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800 relative">
            <Image
              src="https://github.com/eshanized.png"
              alt={PERSONAL_INFO.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          
          {/* Name and title */}
          <h1 className={`text-xl font-medium text-center ${colors.textPrimary}`}>{PERSONAL_INFO.name}</h1>
          <h2 className={`${colors.textSecondary} mb-2 text-center text-sm`}>{PERSONAL_INFO.title}</h2>
        </div>
        
        {/* Bio */}
        <div className={`${colors.cardBg} p-4 mt-2 border-b ${colors.divider}`}>
          <h3 className={`font-medium mb-2 ${colors.textPrimary}`}>Bio</h3>
          <p className={`text-sm ${colors.textSecondary}`}>{PERSONAL_INFO.about}</p>
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className={`${colors.accent} text-white rounded-md p-3 flex items-center justify-center`}
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>Email</span>
          </a>
          
          <a 
            href={PERSONAL_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colors.cardBg} ${colors.textPrimary} rounded-md p-3 flex items-center justify-center border ${colors.divider}`}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            <span>Website</span>
          </a>
        </div>
        
        {/* Social links */}
        <div className={`${colors.cardBg} mt-2 border-t ${colors.divider}`}>
          <h3 className={`font-medium p-4 pb-2 ${colors.textPrimary} text-base`}>Connect</h3>
          
          {PERSONAL_INFO.github && (
            <a 
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 ${colors.textPrimary} border-b ${colors.divider}`}
            >
              <Github className="w-5 h-5 mr-4" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </a>
          )}
          
          {PERSONAL_INFO.linkedin && (
            <a 
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 ${colors.textPrimary} border-b ${colors.divider}`}
            >
              <Linkedin className="w-5 h-5 mr-4" />
              <span>LinkedIn</span>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </a>
          )}
          
          {PERSONAL_INFO.twitter && (
            <a 
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-4 ${colors.textPrimary}`}
            >
              <Twitter className="w-5 h-5 mr-4" />
              <span>Twitter</span>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </a>
          )}
        </div>

        <div className={`p-4 mt-4 text-center ${colors.textSecondary} text-xs`}>
          Version 1.0.0
        </div>
      </div>
    </BaseMIUIApp>
  );
} 