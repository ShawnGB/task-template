import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@knots/shared': fileURLToPath(new URL('../packages/shared/src/index.ts', import.meta.url)),
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
