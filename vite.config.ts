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
        entryFileNames: 'script.js', // Ensure the main JS file is named script.js
        chunkFileNames: 'script.js', // Ensure chunked JS files are named script.js
        assetFileNames: 'style.css', // Ensure CSS is named style.css
      },
    },
  },
});
