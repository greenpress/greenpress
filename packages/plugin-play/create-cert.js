const {execSync} = require('child_process');

execSync(`cd cert && docker run -v $PWD:/certs \\
  -e SSL_SUBJECT=${process.env.HOSTNAME || '0.0.0.0'} stakater/ssl-certs-generator:1.0`, {stdio: 'inherit'});

console.log('done.');