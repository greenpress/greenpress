const baseConfig = require('./base-config')
const { join } = require('path')
const { existsSync } = require('fs')
const extendConfigPath = join(baseConfig.appAbsolutePath, './greenpress.config.js');
const extendConfig = existsSync(extendConfigPath) ? require(extendConfigPath) : { exists: false };

const index = typeof extendConfig === 'function' ? extendConfig(baseConfig) : {
	...baseConfig,
	...extendConfig,
	services: extendConfig && extendConfig.services ?
		Object.keys(extendConfig.services).reduce((services, extendedServiceKey) => {
			services[extendedServiceKey] = {
				...(services[extendedServiceKey] || {}),
				...extendConfig.services[extendedServiceKey]
			}
			return services;
		}, baseConfig.services) :
		baseConfig.services
}

if (index.services.admin.cwd.includes('node_modules')) {
	index.services.admin.script = 'server.js';
} else if (index.services.admin.cwd.includes('dev')) {
	index.services.admin.script = 'npm rebuild node-saas && ' + index.services.admin.script;
}

if (!index.services.front.cwd.includes('node_modules') &&
    index.services.front.cwd.includes('dev')) {
		index.services.front.script = 'npm rebuild node-saas && ' + index.services.front.script;
}
module.exports = index
