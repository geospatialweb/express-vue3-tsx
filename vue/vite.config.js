import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    outDir: 'static',
    rollupOptions: {
      output: {
        manualChunks: {
          deckgl: ['@deck.gl/aggregation-layers', '@deck.gl/core', '@deck.gl/layers'],
          mapboxgl: ['mapbox-gl'],
          vue: ['vue', 'vue-router']
        }
      }
    }
  },
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
