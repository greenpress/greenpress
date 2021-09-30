import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import path from 'path'

const BASE_URL = process.env.BASE_URL || '/gp-admin';

export default defineConfig({
  json: {
    stringify: true
  },
  base: BASE_URL,
  server: {
    port: process.env.PORT || 3001,
    proxy: {
      '/api': process.env.VUE_APP_MAIN_APP_URL || 'http://localhost:3000'
    }
  },
  define: {
    BASE_URL: `"${BASE_URL}"`
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ ElementPlusResolver() ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

