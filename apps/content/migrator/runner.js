const fs = require('fs')
const { updateVersionConfig } = require('./migration-config')

const MIGRATIONS_PATH = __dirname + '/migrations'

async function runMigration (folder) {
  const { check, migrate, verify } = require(MIGRATIONS_PATH + '/' + folder)

  console.log('check migration: ' + folder)
  const needMigration = await check()

  if (!needMigration) {
    console.log('migration ' + folder + ' not necessary.')
    return true
  }

  console.log('running migration...')
  await migrate()
  console.log('Done! Verifying..')
  await verify()
  console.log('Done!\n\n')
}

async function runMigrationsForward (from) {
  const migrationsList = fs.readdirSync(MIGRATIONS_PATH).sort()
  console.log('start migration from ' + from + ' to ' + migrationsList[migrationsList.length - 1])
  let i = from, item
  while (i < migrationsList.length) {
    item = Number(migrationsList[i])
    console.log('loading migration scripts for ' + item)
    await runMigration(item)
    await updateVersionConfig({ 'metadata.latestContentMigration': item })
    i++
  }

  console.log('Finished all necessary migration scripts!')
}

module.exports = {
  runMigrationsForward,
}
