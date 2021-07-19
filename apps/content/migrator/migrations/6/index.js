const mongoose = require('mongoose')
const { appConfiguration } = require('../../../config')
const TENANT = process.env.TENANT || '0'

const Configuration = mongoose.model('Configuration')

const APP_CONFIGS_WITHOUT_STYLE_URL = { key: appConfiguration, metadata: { themeStylesUrl: { $exists: false } } };

/**
 * update site configuration
 */

/**
 * check if app-configuration doesn't have themeStylesUrl propery
 */
async function check () {
  const hasMissingThemeConfig = await Configuration.countDocuments(APP_CONFIGS_WITHOUT_STYLE_URL)
  return !hasMissingThemeConfig
}

/**
 * migrate relevant db rows to fit the new upgrade
 */
function migrate () {
  console.log('start appConfiguration.metadata.themeStylesUrl migration')
  return Configuration.aggregate([
    { $match: APP_CONFIGS_WITHOUT_STYLE_URL },
    { $limit: 20 },
    { $project: { _id: 1 } }
  ])
    .then(async (list) => {
      if (!list || !list.length) {
        console.log('No more rows to update.')
        return true
      }

      let row
      console.log('start migration of ' + list.length + ' items')
      for (let i in list) {
        row = list[i]
        console.log('update appConfig: ', row._id)
        await Configuration.collection.updateOne({ _id: row._id },
          {
            $set: { 'metadata.themeStylesUrl': '' }
          })
      }
      return migrate()
    })
}

/**
 * check if all migration changes done as expected
 */
function verify () {
  return Configuration.countDocuments({ key: appConfiguration, metadata: {themeStylesUrl: {$exists: false}} }).then(count => {
    if (!count) return Promise.reject()
  })
}

module.exports = {
  check, migrate, verify
}
