"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Twitter, Search, Home, Bell, Mail, User, MoreHorizontal, Image as ImageIcon, Send, Repeat, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useOneUITheme } from '../OneUIThemeContext';
import { PERSONAL_INFO } from '@/lib/constants';

// Simulated tweets data
const tweets = [
  {
    id: 1,
    name: PERSONAL_INFO.name,
    username: "@eshanized",
    avatar: PERSONAL_INFO.avatar,
    time: "2h",
    content: "Just pushed some updates to my portfolio site! Check out the new OneUI-inspired design 🚀 #webdev #portfolio",
    image: "/screenshots/portfolio-tweet.png", // Placeholder for a screenshot of the portfolio
    replies: 12,
    likes: 42,
    retweets: 12
  },
  {
    id: 2,
    name: PERSONAL_INFO.name,
    username: "@eshanized",
    avatar: PERSONAL_INFO.avatar,
    time: "5h",
    content: "Working on some exciting Linux projects! Stay tuned for updates 🐧 #Linux #OpenSource",
    replies: 3,
    likes: 38,
    retweets: 8
  },
  {
    id: 3,
    name: PERSONAL_INFO.name,
    username: "@eshanized",
    avatar: PERSONAL_INFO.avatar,
    time: "1d",
    content: "Just discovered an amazing new way to optimize system performance. Blog post coming soon! 💻 #tech #optimization",
    replies: 7,
    likes: 56,
    retweets: 15
  },
  {
    id: 4,
    name: PERSONAL_INFO.name,
    username: "@eshanized",
    avatar: PERSONAL_INFO.avatar,
    time: "2d",
    content: "Loving the developer community! Thanks for all the support and feedback on my recent projects 🙏 #developers #community",
    replies: 12,
    likes: 89,
    retweets: 24
  }
];

export default function TwitterApp() {
  const [newTweet, setNewTweet] = useState("");
  const { colors } = useOneUITheme();
  
  return (
    <BaseOneUIApp title="Twitter" rightAction="new">
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* Profile Header */}
        <div className={`p-4 ${colors.cardBg} sticky top-0 z-10 border-b ${colors.divider}`}>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src={PERSONAL_INFO.avatar}
                alt="Profile"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="ml-3">
              <h2 className={`font-medium ${colors.textPrimary}`}>{PERSONAL_INFO.name}</h2>
              <p className={`${colors.textSecondary} text-sm`}>@{PERSONAL_INFO.username}</p>
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
                    src={tweet.avatar}
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center text-sm">
                  <span className={`font-medium ${colors.textPrimary}`}>{tweet.name}</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>@{tweet.username}</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>·</span>
                  <span className={`ml-2 ${colors.textSecondary}`}>{tweet.time}</span>
                </div>
                <p className={`mt-1 ${colors.textPrimary}`}>{tweet.content}</p>
                
                {/* Tweet Actions */}
                <div className="mt-3 flex justify-between max-w-md">
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <MessageCircle className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.replies}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <Repeat className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.retweets}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <Heart className="w-5 h-5" />
                    <span className="ml-2 text-sm">{tweet.likes}</span>
                  </button>
                  <button className={`flex items-center ${colors.textSecondary}`}>
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Bottom Navigation */}
        <div className={`flex justify-around items-center p-2 border-t ${colors.divider} ${colors.navBar}`}>
          {[Home, Search, Bell, Mail].map((Icon, index) => (
            <button key={index} className={`${colors.textSecondary} p-2 rounded-full hover:bg-blue-500/10 hover:text-blue-500`}>
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </BaseOneUIApp>
  );
} 