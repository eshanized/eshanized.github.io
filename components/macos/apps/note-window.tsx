"use client";

import { StickyNote } from 'lucide-react';

type NoteWindowProps = {
  title: string;
  content: string;
};

export default function NoteWindow({ title, content }: NoteWindowProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-50 text-gray-800">
      {/* Note header */}
      <div className="border-b border-yellow-200 bg-gradient-to-r from-yellow-200 to-yellow-100 p-3 flex items-center">
        <StickyNote className="w-5 h-5 text-yellow-700 mr-2" />
        <h2 className="font-medium text-yellow-800">{title}</h2>
      </div>
      
      {/* Note content */}
      <div className="flex-1 p-4 overflow-y-auto font-sans text-gray-800 whitespace-pre-wrap" style={{ lineHeight: "1.6" }}>
        {content}
      </div>
    </div>
  );
} 