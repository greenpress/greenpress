const baseConfig = require('./base-config')
const { join } = require('path')
const { existsSync } = require('fs')
const extendConfigPath = join(baseConfig.appAbsolutePath, './greenpress.config.js');
const extendConfig = existsSync(extendConfigPath) ? require(extendConfigPath) : { exists: false };

const mergedConfig = typeof extendConfig === 'function' ? extendConfig(baseConfig) : {
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

module.exports = mergedConfig
