const {join} = require('path');
const execute = require('../utils/execute');

function getCommand(tenant, host) {
  return `TENANT=${tenant} HOST=${host} node helpers/init`
}

function populate({email, password, tenant, host}) {
  const cmd = `EMAIL=${email} PASSWORD=${password} ${getCommand(tenant, host)}`;
  execute(cmd, 'populate auth', {stdio: 'inherit', cwd: join(process.cwd(), '/apps/auth')});
  execute(cmd, 'populate content', {stdio: 'inherit', cwd: join(process.cwd(), '/apps/content')});

}

module.exports = {populate, getCommand}
