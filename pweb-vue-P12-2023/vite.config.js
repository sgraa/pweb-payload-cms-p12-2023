import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pweb-vue-P12-2023/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
    // Opsi lain dari konfigurasi Anda
    optimizeDeps: {
      // Daftar modul eksternal yang harus diabaikan oleh Vite/Rollup
      external: ['axios'],
    },
})
