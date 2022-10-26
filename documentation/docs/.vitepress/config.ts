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
    },
    sidebar: [
      {
        text: 'GETTING STARTED',
        items: [
          {text: 'Intro to Greenpress', link: '/getting-started/intro'},
          {text: 'Installation', link: '/getting-started/installation'},
          {text: 'Deployment', link: '/getting-started/deployment'},
          {text: 'Create your first plugin', link: '/getting-started/create-your-first-plugin'},
        ]
      },
      {
        text: 'PLUGINS',
        items: [
          {text: 'Create a Plugin', link: '/plugins/create'},
          {text: 'Test your Plugin', link: '/plugins/test'},
          {text: 'Deploy your Plugin', link: '/plugins/deploy'},
          {text: 'Hooks and Events', link: '/plugins/hooks'},
          {text: 'API Proxy', link: '/plugins/api-proxy'},
          {text: 'Micro-Frontend', link: '/plugins/micro-frontend'},
          {text: 'Pre-Designed Frontends', link: '/plugins/pre-designed-frontends'},
        ]
      },
      {
        text: 'MICRO-FRONTENDS',
        items: [
          {text: 'Cross-Domain Authorization', link: '/mfe/cross-domain-authorization'},
        ]
      },
      {
        text: 'PRE-DESIGNED FRONTENDS',
        items: [
          {text: 'Blocks List', link: '/pre-designed-frontends/blocks-list'},
          {text: 'Rows List', link: '/pre-designed-frontends/rows-list'},
          {text: 'Free HTML', link: '/pre-designed-frontends/free-html'},
        ]
      }
    ]
  }
})
