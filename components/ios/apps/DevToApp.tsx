"use client";

import React from 'react';
import BaseIOSApp from './BaseIOSApp';
import Image from 'next/image';
import { Heart, MessageCircle, Bookmark, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Building an iOS-Inspired Portfolio with Next.js and TailwindCSS",
    description: "A detailed guide on how I created an iOS-like interface for my portfolio website using modern web technologies.",
    tags: ["webdev", "react", "nextjs", "tailwindcss"],
    reactions: 156,
    comments: 23,
    readTime: "8 min read",
    timestamp: "2 days ago"
  },
  {
    id: 2,
    title: "Advanced Linux System Optimization Techniques",
    description: "Deep dive into various methods and tools for optimizing Linux system performance, from kernel tweaks to service management.",
    tags: ["linux", "performance", "tutorial", "devops"],
    reactions: 234,
    comments: 45,
    readTime: "12 min read",
    timestamp: "4 days ago"
  },
  {
    id: 3,
    title: "Creating a Dark Mode Toggle with React and CSS Variables",
    description: "Learn how to implement a smooth dark mode transition using React hooks and CSS custom properties.",
    tags: ["javascript", "react", "css", "webdev"],
    reactions: 189,
    comments: 28,
    readTime: "6 min read",
    timestamp: "1 week ago"
  }
];

export default function DevToApp() {
  return (
    <BaseIOSApp title="DEV Community" rightAction="new">
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700/60">
        {/* Profile Header */}
        <div className="p-4 bg-white dark:bg-black sticky top-0 z-10 backdrop-blur-xl bg-opacity-70 dark:bg-opacity-70">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src="https://github.com/eshanized.png"
                alt="Profile"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="ml-3">
              <h2 className="font-bold text-black dark:text-white">Eshan Roy</h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>12 posts</span>
                <span className="mx-2">•</span>
                <span>583 followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
        {articles.map((article) => (
          <article key={article.id} className="bg-white dark:bg-black p-4">
            <div className="flex flex-col">
              {/* Article Header */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src="https://github.com/eshanized.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium text-black dark:text-white">Eshan Roy</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{article.timestamp}</span>
                </div>
              </div>

              {/* Article Content */}
              <h2 className="text-xl font-bold text-black dark:text-white mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {article.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-300 flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{article.reactions}</span>
                  </button>
                  <button className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{article.comments}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{article.readTime}</span>
                  <button className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </BaseIOSApp>
  );
} 