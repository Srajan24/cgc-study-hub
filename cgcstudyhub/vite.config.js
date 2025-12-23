import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),

    // Compression for production
    mode === 'production' &&
    compression({
      verbose: true,
      disable: false,
      threshold: 1024, // compress files bigger than 1 KB
      algorithm: 'gzip',
      ext: '.gz',
      filter: /\.(js|mjs|json|css|html|svg)$/i,
    }),

    // Optional: Brotli compression
    mode === 'production' &&
    compression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: /\.(js|mjs|json|css|html|svg)$/i,
    }),

    // Bundle visualizer (only when running with mode=analyze)
    mode === 'analyze' &&
    visualizer({
      filename: 'bundle-report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  // Include extra assets like Lottie and PPTX
  assetsInclude: ['**/*.pptx', '**/*.lottie'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('pdfjs-dist')) return 'pdf';
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('react-router')) return 'router';
            if (id.includes('lottie')) return 'lottie';
            return 'vendor';
          }
        }
      },
    },
  },
  
  optimizeDeps: {
    include: [
      "lucide-react",
      "framer-motion", 
      "react-router-dom",
      "react-hot-toast"
    ]
  }
}));
