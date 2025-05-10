"use client";

import React from 'react';
import BaseIOSApp from './BaseIOSApp';
import { PROJECTS } from '@/lib/constants';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsApp() {
  return (
    <BaseIOSApp title="Projects" rightAction="more">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        
        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Project image */}
              <div className="w-full h-48 relative">
                <Image 
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              {/* Project details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span>Code</span>
                  </a>
                  
                  {project.demoLink && project.demoLink !== "#" && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseIOSApp>
  );
} 