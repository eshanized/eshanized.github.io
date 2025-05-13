"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, Grid, Award, Clock, Download, Star as StarIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Software Center Logo SVG Component
const SoftwareCenterLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm4.02 6.63c.746-.03 1.454.392 1.454 1.458 0 .78-.504 1.592-1.008 1.592-.604 0-1.108-.812-1.108-1.592 0-.728.392-1.428 1.108-1.458h-.446zm-8.04 0c.716.03 1.108.73 1.108 1.458 0 .78-.504 1.592-1.108 1.592-.504 0-1.008-.812-1.008-1.592 0-1.066.708-1.488 1.454-1.458h-.446zm4.02 14.74c-4.02 0-7.284-1.82-7.284-3.276 0-1.458 3.264-3.276 7.284-3.276s7.284 1.818 7.284 3.276c0 1.456-3.264 3.276-7.284 3.276z" fill="url(#paint0_linear_penguin)"/>
    <defs>
      <linearGradient id="paint0_linear_penguin" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F8B600"/>
        <stop offset="1" stopColor="#F89B00"/>
      </linearGradient>
    </defs>
  </svg>
);

// App data interface
type App = {
  id: string;
  name: string;
  developer: string;
  description: string;
  category: string;
  rating: number;
  price: string;
  icon: string;
  screenshots: string[];
  featured?: boolean;
};

export default function SoftwareCenterApp() {
  const [activeSection, setActiveSection] = useState<'discover' | 'create' | 'work' | 'play' | 'develop' | 'categories'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  
  // Sample apps data
  const apps: App[] = [
    {
      id: 'gimp',
      name: 'GIMP',
      developer: 'GIMP Team',
      description: 'GIMP is a free and open-source image editor used for image manipulation and image editing, free-form drawing, transcoding between different image file formats, and more specialized tasks.',
      category: 'Graphics',
      rating: 4.8,
      price: 'Free',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/The_GIMP_icon_-_gnome.svg',
      screenshots: ['https://www.gimp.org/release-notes/images/2.10-update-ui.jpg'],
      featured: true
    },
    {
      id: 'kdenlive',
      name: 'Kdenlive',
      developer: 'KDE',
      description: 'Kdenlive is a free and open-source video editing software based on the MLT Framework and KDE Frameworks.',
      category: 'Video',
      rating: 4.7,
      price: 'Free',
      icon: 'https://kdenlive.org/wp-content/uploads/2016/04/kdenlive-logo.png',
      screenshots: ['https://kdenlive.org/wp-content/uploads/2021/04/kdenlive-2104-title.jpg'],
      featured: true
    },
    {
      id: 'inkscape',
      name: 'Inkscape',
      developer: 'Inkscape Team',
      description: 'Inkscape is a free and open-source vector graphics editor used to create vector images, primarily in Scalable Vector Graphics (SVG) format.',
      category: 'Graphics',
      rating: 4.9,
      price: 'Free',
      icon: 'https://media.inkscape.org/media/resources/file/inkscape.svg',
      screenshots: ['https://media.inkscape.org/media/resources/file/Inkscape-1.2-screenshot-1.png']
    },
    {
      id: 'blender',
      name: 'Blender',
      developer: 'Blender Foundation',
      description: "Blender is a free and open-source 3D computer graphics software toolset used for creating animated films, visual effects, art, 3D models, and more.",
      category: '3D Graphics',
      rating: 4.5,
      price: 'Free',
      icon: 'https://download.blender.org/branding/community/blender_community_badge_white.svg',
      screenshots: ['https://www.blender.org/wp-content/uploads/2019/07/blender_28_splash.jpg']
    },
    {
      id: 'audacity',
      name: 'Audacity',
      developer: 'Audacity Team',
      description: 'Audacity is a free and open-source digital audio editor and recording application software.',
      category: 'Audio',
      rating: 4.6,
      price: 'Free',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Audacity_Logo.svg',
      screenshots: ['https://www.audacityteam.org/wp-content/uploads/2021/08/Audacity-3.0.png']
    },
    {
      id: 'krita',
      name: 'Krita',
      developer: 'KDE',
      description: 'Krita is a free and open-source raster graphics editor designed primarily for digital painting and animation.',
      category: 'Graphics',
      rating: 4.7,
      price: 'Free',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Calligrakrita-base.svg',
      screenshots: ['https://krita.org/wp-content/uploads/2019/04/krita-ui.jpg']
    },
    {
      id: 'obs',
      name: 'OBS Studio',
      developer: 'OBS Project',
      description: "OBS Studio is a free and open-source software for video recording and live streaming.",
      category: 'Video',
      rating: 4.5,
      price: 'Free',
      icon: 'https://obsproject.com/assets/images/obs_logo.svg',
      screenshots: ['https://obsproject.com/assets/images/OBSWebsiteBlackTheme.jpg']
    },
    {
      id: 'vlc',
      name: 'VLC',
      developer: 'VideoLAN',
      description: 'VLC is a free and open-source portable multimedia player, encoder, and streamer.',
      category: 'Multimedia',
      rating: 4.9,
      price: 'Free',
      icon: 'https://www.videolan.org/images/vlc-logo.svg',
      screenshots: ['https://www.videolan.org/images/vlc-features/interface.jpg']
    }
  ];
  
  const featuredApps = apps.filter(app => app.featured);
  const getAppsByCategory = (category: string) => apps.filter(app => app.category === category);
  
  const navItems = [
    { id: 'discover', label: 'Discover' },
    { id: 'create', label: 'Create' },
    { id: 'work', label: 'Work' },
    { id: 'play', label: 'Play' },
    { id: 'develop', label: 'Develop' },
    { id: 'categories', label: 'Categories' }
  ];
  
  const categories = [
    'Graphics', 'Video', '3D Graphics', 'Audio', 'Multimedia', 
    'Development', 'Productivity', 'Games'
  ];
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  const renderAppDetail = (app: App) => {
    return (
      <div className="h-full overflow-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b flex items-center">
          <button 
            onClick={() => setSelectedApp(null)}
            className="flex items-center text-sm text-primary hover:text-primary/80 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <div className="flex items-center">
            <SoftwareCenterLogo size={20} />
            <span className="ml-2 font-medium text-primary">Software Center</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <Image 
                src={app.icon} 
                alt={app.name} 
                className="w-24 h-24 rounded-xl shadow-md"
                width={96}
                height={96}
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                <SoftwareCenterLogo size={16} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{app.name}</h1>
              <p className="text-sm text-muted-foreground mb-2">{app.developer}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(app.rating)}</div>
                <span className="text-xs text-muted-foreground">{app.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-primary text-primary-foreground rounded-full px-5 py-1.5 text-sm font-medium">
                  {app.price === 'Free' ? 'Install' : app.price}
                </button>
                <button className="text-xs text-primary">Share</button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Screenshots</h2>
            <div className="flex overflow-x-auto gap-3 pb-3">
              {app.screenshots.map((screenshot, i) => (
                <Image 
                  key={i}
                  src={screenshot} 
                  alt={`${app.name} screenshot ${i+1}`} 
                  className="h-48 rounded-lg shadow-sm"
                  width={320}
                  height={192}
                  style={{ objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {app.description}
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Information</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Developer</dt>
              <dd>{app.developer}</dd>
              <dt className="text-muted-foreground">Category</dt>
              <dd>{app.category}</dd>
              <dt className="text-muted-foreground">Price</dt>
              <dd>{app.price}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  };

  const renderAppCard = (app: App, isFeatured = false) => (
    <div 
      key={app.id}
      className={`${isFeatured ? 'col-span-2' : ''} bg-card hover:bg-accent/20 rounded-xl p-4 cursor-pointer transition-colors`}
      onClick={() => setSelectedApp(app)}
    >
      <div className="flex gap-3">
        <div className="relative">
          <Image 
            src={app.icon} 
            alt={app.name}
            className="w-16 h-16 rounded-xl shadow-sm"
            width={64}
            height={64}
            style={{ objectFit: 'cover' }}
          />
          {isFeatured && (
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
              <SoftwareCenterLogo size={12} />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-sm">{app.name}</h3>
          <p className="text-xs text-muted-foreground mb-1">{app.category}</p>
          <div className="flex items-center gap-1">
            <div className="flex">{renderStars(app.rating)}</div>
            <span className="text-[10px] text-muted-foreground">{app.rating.toFixed(1)}</span>
          </div>
          <p className="text-xs font-medium mt-1">{app.price}</p>
        </div>
      </div>
      {isFeatured && (
        <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{app.description}</p>
      )}
    </div>
  );

  const renderDiscoverSection = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Featured Software</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {featuredApps.map(app => renderAppCard(app, true))}
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Graphics & Design</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {getAppsByCategory('Graphics').map(app => renderAppCard(app))}
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Audio & Video</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...getAppsByCategory('Audio'), ...getAppsByCategory('Video')].map(app => renderAppCard(app))}
      </div>
    </div>
  );

  const renderCategoriesSection = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map(category => (
          <div key={category} className="bg-card hover:bg-accent/20 rounded-xl p-4 cursor-pointer transition-colors group relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <SoftwareCenterLogo size={16} />
            </div>
            <h3 className="font-medium">{category}</h3>
            <p className="text-sm text-muted-foreground">
              {getAppsByCategory(category).length} apps
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Top navigation */}
      <div className="border-b bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center px-6 h-12">
          <div className="flex items-center mr-4">
            <SoftwareCenterLogo size={24} />
            <span className="ml-2 font-semibold text-primary">Software Center</span>
          </div>
          <nav className="flex space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`text-sm py-1 border-b-2 transition-colors ${
                  activeSection === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveSection(item.id as any)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="ml-auto relative w-64">
            <input
              type="text"
              placeholder="Search software"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted py-1.5 px-8 rounded-full text-sm focus:outline-none"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {selectedApp ? (
          renderAppDetail(selectedApp)
        ) : (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-full overflow-auto"
          >
            {activeSection === 'discover' && renderDiscoverSection()}
            {activeSection === 'categories' && renderCategoriesSection()}
            {(activeSection === 'create' || activeSection === 'work' || activeSection === 'play' || activeSection === 'develop') && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No content available for this section</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 