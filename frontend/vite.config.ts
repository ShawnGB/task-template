import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '@app/shared': fileURLToPath(new URL('../packages/shared/src/index.ts', import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL ?? 'http://localhost:3001',
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
})
