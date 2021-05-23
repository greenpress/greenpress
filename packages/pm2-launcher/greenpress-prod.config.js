process.env.NODE_ENV = 'production';

const { excludedServices } = require('./config');
const apps = require('./apps');

module.exports = {
  apps: [
    apps.db,
    apps.auth,
    apps.secrets,
    apps.content,
    apps.drafts,
    apps.assets,
    apps.front,
    apps.admin
  ].filter(({ name }) => !excludedServices.includes(name)),
};
