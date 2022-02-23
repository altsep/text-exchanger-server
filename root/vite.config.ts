import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // base: '/',
  // root: '/',
  build: {
    outDir: '../../server/dist',
    // manifest: true,
    // rollupOptions: {
    //   input: {
    //     index: path.resolve(__dirname, 'index.html'),
    //   },
    //   output: {
    //     dir: '../check/dist',
    //   },
    // },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
