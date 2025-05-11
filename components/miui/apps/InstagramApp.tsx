"use client";

import React from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

const posts = [
  {
    id: 1,
    image: "/images/setup.jpg",
    caption: "My current dev setup 💻 Loving the productivity boost! #coding #developer #setup",
    likes: 245,
    comments: 18,
    timestamp: "2h"
  },
  {
    id: 2,
    image: "/images/linux.jpg",
    caption: "Just customized my Linux environment. Clean and minimal! 🐧 #Linux #ricing #opensource",
    likes: 189,
    comments: 23,
    timestamp: "5h"
  },
  {
    id: 3,
    image: "/images/code.jpg",
    caption: "Late night coding session. Building something exciting! 🚀 #webdev #nextjs #typescript",
    likes: 312,
    comments: 28,
    timestamp: "8h"
  }
];

const stories = [
  { id: 1, username: "You", isYours: true },
  { id: 2, username: "techie_dev", hasStory: true },
  { id: 3, username: "webdev_pro", hasStory: true },
  { id: 4, username: "linux_guru", hasStory: true },
  { id: 5, username: "code_master", hasStory: true }
];

export default function InstagramApp() {
  return (
    <BaseMIUIApp title="Instagram" rightAction="new">
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700/60">
        {/* Stories */}
        <div className="p-4 bg-white dark:bg-black overflow-x-auto">
          <div className="flex space-x-4">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-1">
                <div className={`w-16 h-16 rounded-full ${
                  story.hasStory ? 'p-0.5 bg-gradient-to-tr from-yellow-400 to-pink-600' : ''
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white dark:border-black">
                    <Image
                      src={story.isYours ? "https://github.com/eshanized.png" : `/images/avatar${story.id}.jpg`}
                      alt={story.username}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {story.isYours && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-xs">+</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-900 dark:text-gray-100">{story.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-black">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src="https://github.com/eshanized.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="font-semibold text-sm text-black dark:text-white">eshanized</span>
              </div>
              <button>
                <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square">
              <Image
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button>
                    <Heart className="w-7 h-7 text-gray-900 dark:text-gray-100" />
                  </button>
                  <button>
                    <MessageCircle className="w-7 h-7 text-gray-900 dark:text-gray-100" />
                  </button>
                  <button>
                    <Share2 className="w-7 h-7 text-gray-900 dark:text-gray-100" />
                  </button>
                </div>
                <button>
                  <Bookmark className="w-7 h-7 text-gray-900 dark:text-gray-100" />
                </button>
              </div>

              {/* Likes */}
              <div className="mt-2">
                <span className="font-semibold text-sm text-black dark:text-white">{post.likes} likes</span>
              </div>

              {/* Caption */}
              <div className="mt-1">
                <span className="font-semibold text-sm text-black dark:text-white mr-2">eshanized</span>
                <span className="text-sm text-black dark:text-white">{post.caption}</span>
              </div>

              {/* Comments */}
              <button className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                View all {post.comments} comments
              </button>

              {/* Timestamp */}
              <div className="mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </BaseMIUIApp>
  );
} 