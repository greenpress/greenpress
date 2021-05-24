const { execSync } = require('child_process');
const { existsSync } = require('fs');

try {
  if (existsSync('../../greenpress.config.js')) {
    console.log('found greenpress.config on root directory');
    const { front } = require('../../greenpress.config.js').services || {};

    console.log('using environment variables from file');

    if (front.theme) {
      console.log('set "theme" to:', front.theme);
      process.env.THEME = front.theme;
    }

  }
} catch (e) {
  console.log('error handling greenpress.config on blog-front build', e);
  //
}

console.log('proceed with command:', process.argv[2]);
execSync(process.argv[2], { stdio: 'inherit' });
