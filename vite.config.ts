import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure the site works when hosted at the root of the domain
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude lucide-react from optimization
  },
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      output: {
        entryFileNames: 'script.js', // Main JS file renamed to script.js
        chunkFileNames: 'script.js', // All chunked JS files renamed to script.js
        assetFileNames: 'style.css', // CSS file renamed to style.css
        // Ensure index.html is still generated
      },
    },
    minify: 'terser', // Enable minification using Terser for better JS minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    cssCodeSplit: false, // Disable CSS splitting, as we are naming the CSS file explicitly
    sourcemap: false, // Disable sourcemaps for production
  },
  server: {
    port: 3000, // Customize the development server port
    open: true, // Automatically open the browser
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // Define environment variables for React
  },
});
