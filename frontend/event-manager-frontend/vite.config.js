import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',           // Output folder
    emptyOutDir: true,        // Clear old build files
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // optional, for cleaner imports
    },
  },
  base: './', // ensures relative paths in index.html, needed for Express static serving
});