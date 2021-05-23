#!/usr/bin/env node
const { join } = require('path')
const { existsSync, mkdirSync } = require('fs');
const config = require('./config');

[ './db-data', './tmp' ].map(path => {
  const fullPath = join(config.appAbsolutePath, path);
  if (!existsSync(fullPath)) {
    console.log(`creating ${path} folder..`);
    mkdirSync(fullPath);
    console.log('created!');
  } else {
    console.log(path + ' folder already exists.');
  }
})
