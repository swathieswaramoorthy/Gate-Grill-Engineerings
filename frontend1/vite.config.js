import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  server: {
    watch: {
      ignored: ['**/DumpStack.log.tmp'], // Fix for chokidar error
    },
  },
});
