import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginSitemap from 'vite-plugin-sitemap';

// Define your website URLs
const githubUrl = 'https://eshanized.github.io';
const gitlabUrl = 'https://eshanized.gitlab.io';

// Use the appropriate URL based on the deployment target
const siteUrl = process.env.DEPLOY_TARGET === 'gitlab' ? gitlabUrl : githubUrl;

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
        entryFileNames: 'scripts.js',  // JavaScript output as scripts.js
        chunkFileNames: 'scripts.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css';
          }
          if (assetInfo.name === 'robots.txt') {
            return 'robots.txt';
          }
          return '[name][extname]';
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});