const mongoose = require('mongoose')
const Configuration = mongoose.model('Configuration')
const { CONFIG_KEY, MIGRATION_KEY } = require('./consts')

function initMigrationConfig (migrationVersion) {
  const versionConfig = new Configuration({
    tenant: '0',
    key: CONFIG_KEY,
    public: false,
    metadata: {
      initialContentMigrationVersion: migrationVersion,
      latestContentMigration: migrationVersion,
    }
  })
  const migrationConfig = new Configuration({
    tenant: '0',
    key: MIGRATION_KEY,
    public: false,
    metadata: {
      isMigrationRunning: false,
    }
  })
  // consider running the init-data here too, because it's a new application
  return Promise.all([migrationConfig.save(), versionConfig.save()])
}

function getVersionConfig () {
  return Configuration.findOne({ key: CONFIG_KEY })
}

function updateVersionConfig ($set) {
  return Configuration.updateOne({ key: CONFIG_KEY }, { $set })
}

module.exports = { initMigrationConfig, getVersionConfig, updateVersionConfig }
