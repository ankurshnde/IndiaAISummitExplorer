import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/IndiaAISummitExplorer/', // GitHub repo name for GitHub Pages
  build: {
    target: 'es2015',
    minify: 'esbuild', // Changed from ter ser to esbuild
    cssMinify: true
  }
})
