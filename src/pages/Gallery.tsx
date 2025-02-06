import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, X, Camera, User, Heart, Download, Share2, ExternalLink } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  photographer: string;
  photographerUrl: string;
  category: string;
  likes: number;
  downloads: number;
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['Nature', 'Architecture', 'Travel', 'Urban', 'Abstract'];
  
  // Curated collection of high-quality images with categories
  const images: GalleryImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
      title: 'Modern Architecture',
      photographer: 'Lance Anderson',
      photographerUrl: 'https://unsplash.com/@lanceanderson',
      category: 'Architecture',
      likes: 1240,
      downloads: 856
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1499678329028-101435549a4e',
      title: 'Beach Sunset',
      photographer: 'Simon Zhu',
      photographerUrl: 'https://unsplash.com/@smnzhu',
      category: 'Nature',
      likes: 2150,
      downloads: 1234
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1463288889890-a56b2853c40f',
      title: 'Mountain Range',
      photographer: 'Dave Herring',
      photographerUrl: 'https://unsplash.com/@daveherring',
      category: 'Nature',
      likes: 1890,
      downloads: 945
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574',
      title: 'Neon City',
      photographer: 'Cristina Gottardi',
      photographerUrl: 'https://unsplash.com/@cristina_gottardi',
      category: 'Urban',
      likes: 1567,
      downloads: 789
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e',
      title: 'Forest Path',
      photographer: 'Kunal Shinde',
      photographerUrl: 'https://unsplash.com/@kunalshinde',
      category: 'Nature',
      likes: 2340,
      downloads: 1567
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
      title: 'Starry Night',
      photographer: 'Casey Horner',
      photographerUrl: 'https://unsplash.com/@mischievous_penguins',
      category: 'Nature',
      likes: 3210,
      downloads: 2145
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      title: 'Desert Landscape',
      photographer: 'Jeremy Bishop',
      photographerUrl: 'https://unsplash.com/@jeremybishop',
      category: 'Nature',
      likes: 1890,
      downloads: 978
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04',
      title: 'Urban Life',
      photographer: 'Benjamin Suter',
      photographerUrl: 'https://unsplash.com/@benjaminjsuter',
      category: 'Urban',
      likes: 1456,
      downloads: 867
    },
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      title: 'Tropical Beach',
      photographer: 'Sean O.',
      photographerUrl: 'https://unsplash.com/@seano',
      category: 'Travel',
      likes: 2789,
      downloads: 1543
    },
    {
      id: '10',
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      title: 'Snow Mountains',
      photographer: 'Benjamin Voros',
      photographerUrl: 'https://unsplash.com/@vorosbenisop',
      category: 'Nature',
      likes: 3456,
      downloads: 2134
    }
  ];

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.photographer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] opacity-5 bg-cover bg-center fixed" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Photo Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A curated collection of stunning photographs showcasing the beauty of our world
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  All
                </motion.button>
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid"
              >
                <div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                    <img
                      src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} />
                      <a
                        href={image.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {image.photographer}
                      </a>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Heart size={16} className="text-red-400" />
                        <span>{image.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={16} className="text-blue-400" />
                        <span>{image.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${selectedImage.url}?auto=format&fit=crop&w=1600&q=80`}
                  alt={selectedImage.title}
                  className="w-full h-[80vh] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-semibold text-white mb-2">{selectedImage.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <a
                        href={selectedImage.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
                      >
                        <User size={20} />
                        <span className="font-medium">{selectedImage.photographer}</span>
                      </a>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80">{selectedImage.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-4 py-2 text-white">
                        <Heart size={18} />
                        <span>{selectedImage.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-4 py-2 text-white">
                        <Download size={18} />
                        <span>{selectedImage.downloads.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-4 py-2 text-white">
                        <Share2 size={18} />
                      </button>
                      <a
                        href={selectedImage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full px-4 py-2 text-white"
                      >
                        <ExternalLink size={18} />
                        <span>Open Original</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}