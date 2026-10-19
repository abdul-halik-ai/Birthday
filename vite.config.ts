import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Change base to '/<your-repo-name>/' for GitHub Pages
export default defineConfig({ plugins: [react()], base: './' })
