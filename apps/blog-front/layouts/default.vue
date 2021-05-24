<template>
  <Layout />
</template>
<script>
  import Layout from '~/.current_theme/Layout'
  import { useConfiguration } from '../compositions/app-configuration'

  export default {
    components: {
      Layout
    },
    middleware: 'layout-data',
    setup () {
      return { config: useConfiguration() }
    },
    head () {
      return {
        htmlAttrs: {
          lang: this.config.language,
          dir: this.config.direction
        },
        titleTemplate: `%s | ${this.config.titleSuffix}`,
        meta: [
          { hid: 'description', name: 'description', content: this.config.description },
          { hid: 'keywords', name: 'keywords', content: this.config.keywords }
        ]
      }
    }
  }
</script>
<style lang="scss">
  :root {
    --ck-image-style-spacing: 1.5em;
  }

  figure.image {
    max-width: 100%;
    img {
      max-width: 100%;
    }
    &.image-style-side {
      float: right;
      margin-left: var(--ck-image-style-spacing);
      max-width: 50%;
      img {
        width: 100%;
      }
    }

    &.image-style-align-left {
      float: left;
      margin-right: var(--ck-image-style-spacing);
      img {
        width: 100%;
      }
    }

    &.image-style-align-center {
      margin-left: auto;
      margin-right: auto;
      img {
        width: 100%;
      }
    }

    &.image-style-align-right {
      float: right;
      margin-left: var(--ck-image-style-spacing);
      img {
        width: 100%;
      }
    }

    figcaption {
      word-break: break-word;
      color: #333;
      background-color: #f7f7f7;
      padding: .6em;
      font-size: .75em;
      outline-offset: -1px;
      text-align: center;
      line-height: 40px;
    }
  }
</style>

