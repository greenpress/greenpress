#!/usr/bin/env node

const program = require('commander')
const { version } = require('./package.json')

program.version(version)

program.option('-V', '--verbose', 'show verbose output');

require('./commands/create')(program)
require('./commands/upgrade')(program)
require('./commands/populate')(program)
require('./commands/start')(program)
require('./commands/stop')(program)
require('./commands/missing')(program)
require('./commands/theme')(program)
require('./commands/deployment')(program)
require('./commands/deploy')(program)
require('./commands/logs')(program)

program.parse(process.argv)
