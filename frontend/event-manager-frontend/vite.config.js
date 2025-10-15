import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'es2020'  // ← ADD THIS LINE
  },
  server: {
    port: 9090
  }
})