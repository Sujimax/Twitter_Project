import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Definitive Vite config for Tailwind 4 + Proxy 8000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/posts': 'http://127.0.0.1:8000',
      '/users': 'http://127.0.0.1:8000',
    }
  }
})