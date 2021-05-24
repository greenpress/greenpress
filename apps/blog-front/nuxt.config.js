const { port, alternativeHmr } = require('./config')

module.exports = {
  server: {
    port: port, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/date-time.filter'
  ],
  /*
  ** Nuxt.js build-modules
  */
  buildModules: [
		'@nuxtjs/composition-api'
	],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 30
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:' + port,
    browserBaseURL: '/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: [
      'vuex-composition-helpers'
    ]
  },
  extractCSS: {
    allChunks: true
  },
  render: {
    http2: { push: true }
  },
  watchers: alternativeHmr ? {
    webpack: {
      poll: true
    }
  } : {},
}
