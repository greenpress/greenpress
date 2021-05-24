const localhost = 'localhost'

function getProxies (envVar = '', defaults = []) {
	return envVar ? envVar.split(',') : defaults
}

module.exports = {
	port: process.env.PORT || 3000,
	tenant: process.env.BASIC_TENANT || '0',
	applicationUrl: process.env.APPLICATION_URL || 'http://localhost:3000',
  alternativeHmr: !!process.env.ALTERNATIVE_HMR,
	contentService: {
		protocol: process.env.CONTENT_SERVICE_PROTOCOL || 'http',
		url: process.env.CONTENT_SERVICE_URL || localhost,
		port: process.env.CONTENT_SERVICE_PORT || 9001,
		proxies: getProxies(process.env.CONTENT_SERVICE_PROXIES, [
			'/api/categories',
			'/api/posts',
			'/api/menus',
			'/api/tags',
			'/api/configurations'
		])
	},
	authService: {
		protocol: process.env.AUTH_SERVICE_PROTOCOL || 'http',
		url: process.env.AUTH_SERVICE_URL || localhost,
		port: process.env.AUTH_SERVICE_PORT || 9000,
		proxies: getProxies(process.env.AUTH_SERVICE_PROXIES, [
			'/api/signin',
			'/api/signup',
			'/api/token',
			'/api/me',
			'/api/users',
			'/api/logout'
		])
	},
	assetsService: {
		protocol: process.env.ASSETS_SERVICE_PROTOCOL || 'http',
		url: process.env.ASSETS_SERVICE_URL || localhost,
		port: process.env.ASSETS_SERVICE_PORT || 9003,
		proxies: getProxies(process.env.ASSETS_SERVICE_PROXIES, [
			'/api/assets',
			'/api/storage'
		])
	},
	adminPanel: {
		protocol: process.env.ADMIN_PANEL_PROTOCOL || 'http',
		url: process.env.ADMIN_PANEL_URL || localhost,
		port: process.env.ADMIN_PANEL_PORT || 3001,
		proxies: getProxies(process.env.ADMIN_PANEL_PROXIES, ['/gp-admin'])
	},
	draftsService: {
		protocol: process.env.DRAFTS_SERVICE_PROTOCOL || 'http',
		url: process.env.DRAFTS_SERVICE_URL || localhost,
		port: process.env.DRAFTS_SERVICE_PORT || 9005,
		proxies: getProxies(process.env.DRAFTS_SERVICE_PROXIES, [
			'/api/drafts'
		])
	}
}
