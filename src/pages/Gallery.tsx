import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Image as ImageIcon,
  X,
  Camera,
  User,
  Heart,
  Download,
  Share2,
  ExternalLink,
} from 'lucide-react';

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
      downloads: 856,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1499678329028-101435549a4e',
      title: 'Beach Sunset',
      photographer: 'Simon Zhu',
      photographerUrl: 'https://unsplash.com/@smnzhu',
      category: 'Nature',
      likes: 2150,
      downloads: 1234,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1463288889890-a56b2853c40f',
      title: 'Mountain Range',
      photographer: 'Dave Herring',
      photographerUrl: 'https://unsplash.com/@daveherring',
      category: 'Nature',
      likes: 1890,
      downloads: 945,
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574',
      title: 'Neon City',
      photographer: 'Cristina Gottardi',
      photographerUrl: 'https://unsplash.com/@cristina_gottardi',
      category: 'Urban',
      likes: 1567,
      downloads: 789,
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e',
      title: 'Forest Path',
      photographer: 'Kunal Shinde',
      photographerUrl: 'https://unsplash.com/@kunalshinde',
      category: 'Nature',
      likes: 2340,
      downloads: 1567,
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
      title: 'Starry Night',
      photographer: 'Casey Horner',
      photographerUrl: 'https://unsplash.com/@mischievous_penguins',
      category: 'Nature',
      likes: 3210,
      downloads: 2145,
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      title: 'Desert Landscape',
      photographer: 'Jeremy Bishop',
      photographerUrl: 'https://unsplash.com/@jeremybishop',
      category: 'Nature',
      likes: 1890,
      downloads: 978,
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04',
      title: 'Urban Life',
      photographer: 'Benjamin Suter',
      photographerUrl: 'https://unsplash.com/@benjaminjsuter',
      category: 'Urban',
      likes: 1456,
      downloads: 867,
    },
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      title: 'Tropical Beach',
      photographer: 'Sean O.',
      photographerUrl: 'https://unsplash.com/@seano',
      category: 'Travel',
      likes: 2789,
      downloads: 1543,
    },
    {
      id: '10',
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      title: 'Snow Mountains',
      photographer: 'Benjamin Voros',
      photographerUrl: 'https://unsplash.com/@vorosbenisop',
      category: 'Nature',
      likes: 3456,
      downloads: 2134,
    },
  ];

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.photographer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20">
      <div className="fixed absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-5" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container relative mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent">
            Photo Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A curated collection of stunning photographs showcasing the beauty of our world
          </p>
        </motion.div>

        <div className="mx-auto mb-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
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
                    className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
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
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-12 pr-4 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>

          <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid"
              >
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                    <img
                      src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                      alt={image.title}
                      className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="mb-2 text-xl font-semibold">{image.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} />
                      <a
                        href={image.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        onClick={e => e.stopPropagation()}
                      >
                        {image.photographer}
                      </a>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={`${selectedImage.url}?auto=format&fit=crop&w=1600&q=80`}
                  alt={selectedImage.title}
                  className="h-[80vh] w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="mb-2 text-2xl font-semibold text-white">{selectedImage.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <a
                        href={selectedImage.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white transition-colors hover:text-purple-300"
                      >
                        <User size={20} />
                        <span className="font-medium">{selectedImage.photographer}</span>
                      </a>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80">{selectedImage.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                        <Heart size={18} />
                        <span>{selectedImage.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                        <Download size={18} />
                        <span>{selectedImage.downloads.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                        <Share2 size={18} />
                      </button>
                      <a
                        href={selectedImage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
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
