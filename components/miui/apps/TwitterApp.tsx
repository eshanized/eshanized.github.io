"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { useMIUITheme } from '../MIUIThemeContext';

// Simulated tweets data
const tweets = [
  {
    id: 1,
    content: "Just pushed some updates to my portfolio site! Check out the new MIUI-inspired design 🚀 #webdev #portfolio",
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
  const { colors } = useMIUITheme();
  
  return (
    <BaseMIUIApp title="Twitter" rightAction="new">
      <div className={`flex flex-col ${colors.primary}`}>
        {/* Profile Header */}
        <div className={`p-4 ${colors.cardBg} sticky top-0 z-10 border-b ${colors.divider}`}>
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
              <h2 className={`font-medium ${colors.textPrimary}`}>Eshan Roy</h2>
              <p className={`${colors.textSecondary} text-sm`}>@eshanized</p>
            </div>
          </div>
        </div>

        {/* Tweets */}
        {tweets.map((tweet) => (
          <article key={tweet.id} className={`p-4 ${colors.cardBg} border-b ${colors.divider}`}>
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
                  <span className={`font-medium ${colors.textPrimary}`}>Eshan Roy</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>@eshanized</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>·</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>{tweet.timestamp}</span>
                </div>
                <p className={`mt-1 ${colors.textPrimary}`}>{tweet.content}</p>
                
                {/* Tweet Actions */}
                <div className="mt-3 flex justify-between max-w-md">
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.replies}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <Repeat2 className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.retweets}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <Heart className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.likes}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
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