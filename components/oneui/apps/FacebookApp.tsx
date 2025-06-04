"use client";

import React from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, ThumbsUp, MoreHorizontal, Search, Home, Users, Video, Bell } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';
import { PERSONAL_INFO } from '@/lib/constants';

const posts = [
  {
    id: 1,
    avatar: PERSONAL_INFO.avatar,
    time: "2h ago",
    text: "Excited to share my latest project - a fully responsive OneUI-themed portfolio website built with Next.js and TailwindCSS! 🚀",
    image: "/screenshots/portfolio-project.png",
    likes: 120,
    comments: 23,
    shares: 12
  },
  {
    id: 2,
    content: "Just published a new blog post about Linux system optimization techniques. Check it out on my website! 💻",
    timestamp: "5 hours ago",
    likes: 98,
    comments: 15,
    shares: 8
  },
  {
    id: 3,
    content: "Great meetup with the local developer community today! Discussed the latest trends in web development and open source. Looking forward to more such events! 🤝",
    timestamp: "1 day ago",
    likes: 234,
    comments: 45,
    shares: 18,
    image: "/images/meetup.jpg"
  }
];

export default function FacebookApp() {
  const { colors } = useOneUITheme();
  
  return (
    <BaseOneUIApp title="Facebook" rightAction="new">
      <div className={`flex flex-col ${colors.primary}`}>
        {/* Story Section */}
        <div className={`p-4 ${colors.cardBg} overflow-x-auto`}>
          <div className="flex space-x-4">
            <div className="flex-shrink-0 w-20">
              <div className={`relative w-20 h-32 rounded-md overflow-hidden border ${colors.divider}`}>
                <Image
                  src="https://github.com/eshanized.png"
                  alt="Your Story"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <div className="absolute bottom-0 w-full p-1 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs text-center">Add Story</p>
                </div>
              </div>
            </div>
            {/* Additional story placeholders */}
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex-shrink-0 w-20 h-32 ${colors.tertiary} rounded-md animate-pulse`} />
            ))}
          </div>
        </div>

        {/* Create Post */}
        <div className={`p-4 ${colors.cardBg} flex items-center space-x-3 border-t border-b ${colors.divider}`}>
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src="https://github.com/eshanized.png"
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className={`flex-1 ${colors.tertiary} rounded-md px-4 py-2`}>
            <p className={colors.textSecondary}>What's on your mind?</p>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <article key={post.id} className={`${colors.cardBg} border-b ${colors.divider}`}>
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src="https://github.com/eshanized.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="ml-3">
                  <h3 className={`font-medium ${colors.textPrimary}`}>Eshan Roy</h3>
                  <p className={`${colors.textSecondary} text-sm`}>{post.timestamp}</p>
                </div>
              </div>
              
              <p className={`mt-3 ${colors.textPrimary}`}>{post.text}</p>
              
              {post.image && (
                <div className="mt-3 relative h-48 rounded-md overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Post image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}

              {/* Engagement stats */}
              <div className={`mt-3 flex justify-between text-sm ${colors.textSecondary}`}>
                <div className="flex items-center">
                  <ThumbsUp className={`w-4 h-4 ${colors.accent}`} />
                  <span className="ml-2">{post.likes}</span>
                </div>
                <div className="flex space-x-3">
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className={`mt-3 pt-3 border-t ${colors.divider} grid grid-cols-3 gap-2`}>
                <button className={`flex items-center justify-center py-2 ${colors.textSecondary}`}>
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  <span>Like</span>
                </button>
                <button className={`flex items-center justify-center py-2 ${colors.textSecondary}`}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Comment</span>
                </button>
                <button className={`flex items-center justify-center py-2 ${colors.textSecondary}`}>
                  <Share2 className="w-5 h-5 mr-2" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </BaseOneUIApp>
  );
} 