console.log('RUN MIGRATOR')
require('child_process').execSync('node ./migrator',
  { stdio: 'inherit', cwd: __dirname, env: process.env })
console.log('RUN CONTENT')

const { port, mongoUri } = require('./config')

// connect to the database and load models
require('./server/models').connect(mongoUri)

require('./server/routes')

require('@greenpress/api-kit').start('Content Service', port)

