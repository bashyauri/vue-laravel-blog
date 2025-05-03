import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// vite.config.js / vite.config.ts

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
