const mongoose = require('mongoose')
const { appConfiguration } = require('../../../config')
const TENANT = process.env.TENANT || '0'

const Configuration = mongoose.model('Configuration')

/**
 * create site configuration
 */

/**
 * check potential changes to migrate
 */
async function check () {
  const hasConfig = await Configuration.countDocuments({ key: appConfiguration })
  return !hasConfig
}

/**
 * migrate relevant db rows to fit the new upgrade
 */
function migrate () {
  const row = new Configuration({
    tenant: TENANT,
    key: appConfiguration,
    public: true,
    metadata: {
      name: 'greenpress',
      language: 'en',
      direction: 'ltr',
      logoUrl: '/logo.png',
      description: 'Blogs and content sites open-source platform, built for the 21st century, using micro-services and best common technologies.',
      slogan: 'amazing blog platform',
      keywords: 'blog, platform, open-source, node, nuxt, vue',
      theme: 'damal',
      themeStylesUrl: ''
    }
  })
  return row.save()
}

/**
 * check if all migration changes done as expected
 */
function verify () {
  return Configuration.countDocuments({ key: appConfiguration }).then(count => {
    if (!count) return Promise.reject()
  })
}

module.exports = {
  check, migrate, verify
}
