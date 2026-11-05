import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    base: process.env.VERCEL ? '/' : (env.VITE_BASE_PATH || '/'),
    plugins: [react()],
    ssr: {
      noExternal: ['react-helmet-async'],
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2022',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three/') || id.includes('node_modules/@react-three/'))
              return 'three-vendor';
          },
        },
      },
    },
  };
});
