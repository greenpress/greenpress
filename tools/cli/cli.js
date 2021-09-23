#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { version } = require('./package.json')


const program = yargs(hideBin(process.argv));

program.version(version)

program.option('verbose', {
  alias: 'V',
  type: 'boolean',
  description: 'Run with verbose logging'
});

require('./commands/create')(program)
require('./commands/upgrade')(program)
require('./commands/populate')(program)
// require('./commands/start')(program)
// require('./commands/stop')(program)
// require('./commands/missing')(program)
// require('./commands/theme')(program)
// require('./commands/deployment')(program)
// require('./commands/deploy')(program)
// require('./commands/logs')(program)

program.help().argv
