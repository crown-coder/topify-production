import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.smartdatalinks.ng',
        changeOrigin: true,
        secure: false, // if the API uses self-signed certs, keep this
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
