// fe-web-Dashboard/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',

    // PASTIKAN BLOK INI ADA DAN LENGKAP
    coverage: {
      provider: 'v8',
      enabled: true, // <-- Bagian ini sangat penting!
      reporter: ['text', 'json', 'html'],
    },
  },
})