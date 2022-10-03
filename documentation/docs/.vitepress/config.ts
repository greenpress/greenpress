import {defineConfig} from 'vitepress'

export default defineConfig({
  title: 'Greenpress',
  description: '',
  outDir: '../dist',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/greenpress/greenpress/edit/main/documentation/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
    }
  }
})
