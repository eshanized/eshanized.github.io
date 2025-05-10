"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, Grid, Award, Clock, Download, Star as StarIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// App Store Logo SVG Component
const AppStoreLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_8317)"/>
    <path d="M18.4468 8.65403C18.7494 8.12586 18.5685 7.45126 18.0428 7.14727C17.5171 6.84328 16.8456 7.02502 16.543 7.55318L16.0153 8.47442L15.4875 7.55318C15.1849 7.02502 14.5134 6.84328 13.9877 7.14727C13.462 7.45126 13.2811 8.12586 13.5837 8.65403L14.748 10.6864L11.0652 17.1149H8.09831C7.49173 17.1149 7 17.6089 7 18.2183C7 18.8277 7.49173 19.3217 8.09831 19.3217H18.4324C18.523 19.0825 18.6184 18.6721 18.5169 18.2949C18.3644 17.7279 17.8 17.1149 16.8542 17.1149H13.5997L18.4468 8.65403Z" fill="white"/>
    <path d="M11.6364 20.5419C11.449 20.3328 11.0292 19.9987 10.661 19.8888C10.0997 19.7211 9.67413 19.8263 9.45942 19.9179L8.64132 21.346C8.33874 21.8741 8.51963 22.5487 9.04535 22.8527C9.57107 23.1567 10.2425 22.975 10.5451 22.4468L11.6364 20.5419Z" fill="white"/>
    <path d="M22.2295 19.3217H23.9017C24.5083 19.3217 25 18.8277 25 18.2183C25 17.6089 24.5083 17.1149 23.9017 17.1149H20.9653L17.6575 11.3411C17.4118 11.5757 16.9407 12.175 16.8695 12.8545C16.778 13.728 16.9152 14.4636 17.3271 15.1839C18.7118 17.6056 20.0987 20.0262 21.4854 22.4468C21.788 22.975 22.4594 23.1567 22.9852 22.8527C23.5109 22.5487 23.6918 21.8741 23.3892 21.346L22.2295 19.3217Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_87_8317" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2AC9FA"/>
        <stop offset="1" stopColor="#1F65EB"/>
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

export default function AppStoreApp() {
  const [activeSection, setActiveSection] = useState<'discover' | 'create' | 'work' | 'play' | 'develop' | 'categories'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  
  // Sample apps data
  const apps: App[] = [
    {
      id: 'figma',
      name: 'Figma',
      developer: 'Figma, Inc.',
      description: 'Figma is the collaborative interface design tool. Figma helps teams collaborate on and build beautiful screens that deliver engaging experiences.',
      category: 'Design',
      rating: 4.8,
      price: 'Free',
      icon: 'https://cdn.dribbble.com/userupload/7725768/file/original-a7e3e617287f63ce8989ef7d664ffaa3.png?compress=1&resize=400x300&vertical=center',
      screenshots: ['https://help.figma.com/hc/article_attachments/4404835273751/Quick_actions_search_bar.gif'],
      featured: true
    },
    {
      id: 'vscode',
      name: 'Visual Studio Code',
      developer: 'Microsoft Corporation',
      description: 'Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.',
      category: 'Developer Tools',
      rating: 4.7,
      price: 'Free',
      icon: 'https://code.visualstudio.com/assets/apple-touch-icon.png',
      screenshots: ['https://code.visualstudio.com/assets/docs/getstarted/tips-and-tricks/drag-drop.gif'],
      featured: true
    },
    {
      id: 'notion',
      name: 'Notion',
      developer: 'Notion Labs, Inc.',
      description: 'Notion is the all-in-one workspace for your notes, tasks, wikis, and databases.',
      category: 'Productivity',
      rating: 4.9,
      price: 'Free',
      icon: 'https://www.notion.so/front-static/shared/icons/notion-app-icon-3d.png',
      screenshots: ['https://www.notion.so/cdn-cgi/image/format=auto,width=3840,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png']
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      developer: 'Adobe Inc.',
      description: "Photoshop is the world's most advanced image editing application.",
      category: 'Photo & Video',
      rating: 4.5,
      price: '$20.99/month',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
      screenshots: ['https://cdn.mos.cms.futurecdn.net/ThzSFQW4QrrBxP8TttxpBI.jpg']
    },
    {
      id: 'spotify',
      name: 'Spotify',
      developer: 'Spotify AB',
      description: 'Spotify is a digital music service that gives you access to millions of songs.',
      category: 'Music',
      rating: 4.6,
      price: 'Free',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
      screenshots: ['https://storage.googleapis.com/pr-newsroom-wp/1/2023/03/Spotify-Car-UI-Update-1440x1440.jpg']
    },
    {
      id: 'sketch',
      name: 'Sketch',
      developer: 'Sketch B.V.',
      description: 'Sketch is the ultimate tool for digital design for Mac.',
      category: 'Design',
      rating: 4.7,
      price: '$9.99/month',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg',
      screenshots: ['https://www.sketch.com/images/blog/2022-03-18-redefining-design-at-scale/hero.jpg']
    },
    {
      id: 'slack',
      name: 'Slack',
      developer: 'Slack Technologies, Inc.',
      description: "Slack is where work happens. It's a digital workspace that powers your organization.",
      category: 'Business',
      rating: 4.5,
      price: 'Free',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png',
      screenshots: ['https://a.slack-edge.com/ce67d/marketing/img/features/desktop/calls-mac-en-US@2x.png']
    },
    {
      id: 'procreate',
      name: 'Procreate',
      developer: 'Savage Interactive Pty Ltd',
      description: 'Procreate is the most powerful and intuitive digital illustration app available for iPad.',
      category: 'Graphics & Design',
      rating: 4.9,
      price: '$9.99',
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/27/f8/94/27f8946b-9ea2-c711-d2bb-a9d2c52c8838/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
      screenshots: ['https://cdn.dribbble.com/users/27547/screenshots/2223910/media/70ad67a6ee1c4e80bd2cdf47a5571b50.jpg?resize=400x300&vertical=center']
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
    'Design', 'Developer Tools', 'Productivity', 'Photo & Video', 
    'Music', 'Business', 'Graphics & Design'
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
            <AppStoreLogo size={20} />
            <span className="ml-2 font-medium text-primary">App Store</span>
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
                <AppStoreLogo size={16} />
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
                  {app.price === 'Free' ? 'Get' : app.price}
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
              <AppStoreLogo size={12} />
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
      <h2 className="text-xl font-semibold mb-4">Featured Apps</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {featuredApps.map(app => renderAppCard(app, true))}
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Design Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {getAppsByCategory('Design').map(app => renderAppCard(app))}
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Productivity Apps</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getAppsByCategory('Productivity').map(app => renderAppCard(app))}
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
              <AppStoreLogo size={16} />
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
            <AppStoreLogo size={24} />
            <span className="ml-2 font-semibold text-primary">App Store</span>
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
              placeholder="Search apps"
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