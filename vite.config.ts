import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Inject a unique cache-busting version into sw.js on every build.
    // This ensures returning visitors' service workers update after each deploy.
    {
      name: 'sw-version-inject',
      buildStart() {
        const buildHash = Date.now().toString(36);
        const swPath = path.resolve(__dirname, 'public/sw.js');
        const swContent = readFileSync(swPath, 'utf-8');
        const updated = swContent.replace('__SW_CACHE_VERSION__', buildHash);
        writeFileSync(swPath, updated, 'utf-8');
      },
      closeBundle() {
        // Restore the placeholder token so the file stays clean in source control
        const swPath = path.resolve(__dirname, 'public/sw.js');
        const swContent = readFileSync(swPath, 'utf-8');
        // Match the generated hash and restore the placeholder
        const restored = swContent.replace(/qrky-[a-z0-9]+/, (match) => {
          return match; // already replaced in dist; restore placeholder in source
        });
        // Re-read dist sw.js to restore placeholder in source
        const srcSwPath = path.resolve(__dirname, 'public/sw.js');
        const srcContent = readFileSync(srcSwPath, 'utf-8');
        const restoredSrc = srcContent.replace(
          /const CACHE_VERSION = '[a-z0-9]+';/,
          "const CACHE_VERSION = '__SW_CACHE_VERSION__';"
        );
        writeFileSync(srcSwPath, restoredSrc, 'utf-8');
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
})