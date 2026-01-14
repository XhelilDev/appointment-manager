import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Sigurohu që është kështu
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})