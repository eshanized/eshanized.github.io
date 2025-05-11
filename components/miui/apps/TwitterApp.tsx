"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

// Simulated tweets data
const tweets = [
  {
    id: 1,
    content: "Just pushed some updates to my portfolio site! Check out the new iOS-inspired design 🚀 #webdev #portfolio",
    timestamp: "2h",
    likes: 42,
    retweets: 12,
    replies: 5
  },
  {
    id: 2,
    content: "Working on some exciting Linux projects! Stay tuned for updates 🐧 #Linux #OpenSource",
    timestamp: "5h",
    likes: 38,
    retweets: 8,
    replies: 3
  },
  {
    id: 3,
    content: "Just discovered an amazing new way to optimize system performance. Blog post coming soon! 💻 #tech #optimization",
    timestamp: "1d",
    likes: 56,
    retweets: 15,
    replies: 7
  },
  {
    id: 4,
    content: "Loving the developer community! Thanks for all the support and feedback on my recent projects 🙏 #developers #community",
    timestamp: "2d",
    likes: 89,
    retweets: 24,
    replies: 12
  }
];

export default function TwitterApp() {
  return (
    <BaseMIUIApp title="Twitter" rightAction="new">
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
              <p className="text-gray-500 dark:text-gray-400 text-sm">@eshanized</p>
            </div>
          </div>
        </div>

        {/* Tweets */}
        {tweets.map((tweet) => (
          <article key={tweet.id} className="p-4 bg-white dark:bg-black">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src="https://github.com/eshanized.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center text-sm">
                  <span className="font-bold text-black dark:text-white">Eshan Roy</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">@eshanized</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">·</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">{tweet.timestamp}</span>
                </div>
                <p className="mt-1 text-black dark:text-white">{tweet.content}</p>
                
                {/* Tweet Actions */}
                <div className="mt-3 flex justify-between max-w-md">
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.replies}</span>
                  </button>
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                    <Repeat2 className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.retweets}</span>
                  </button>
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </BaseMIUIApp>
  );
} 