import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginSitemap from 'vite-plugin-sitemap';

// Define your website URL
const siteUrl = 'https://eshanized.is-a.dev';

// Define your routes
const routes = [
  '/',
  '/about',
  '/projects',
  '/articles',
  '/stats',
  '/gallery',
  '/contact'
];

export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: siteUrl,
      dynamicRoutes: routes,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
      filename: 'sitemap.xml'
    })
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'assets/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});