#!/usr/bin/env node

import { execSync } from 'child_process';

const [ , , ...argv ] = process.argv;

execSync('npx @greenpress/cli create ' + argv.join(' '), { stdio: 'inherit' });
