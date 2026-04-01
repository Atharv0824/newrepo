import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ⚠ Important for Vercel deployment
  server: {
    port: 5173,
    host: true,  // Allow external access on local network
    strictPort: true  // Fail if port is already in use
  }
})
