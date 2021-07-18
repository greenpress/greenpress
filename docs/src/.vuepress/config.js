const { description } = require('../../package')

module.exports = {
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#title
	 */
	title: 'Greenpress Docs',
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#description
	 */
	description: description,

	/**
	 * Extra tags to be injected to the page HTML `<head>`
	 *
	 * ref：https://v1.vuepress.vuejs.org/config/#head
	 */
	head: [
		[ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
		[ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
		[ 'meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } ]
	],

	/**
	 * Theme configuration, here is the default theme configuration for VuePress.
	 *
	 * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
	 */
	themeConfig: {
		repo: 'greenpress/greenpress',
		docsRepo: 'greenpress/docs',
		editLinks: true,
		docsDir: 'docs',
		lastUpdated: true,
		editLinkText: 'Help us improve this page!',
		nav: [
			{
				text: 'Guide',
				link: '/guide/',
			},
			{
				text: 'Config',
				link: '/config/'
			},
			{
				text: 'Greenpress',
				link: 'https://greenpress.info'
			}
		],
		sidebar: [
			{
				title: 'Guide',
				collapsable: false,
				path: '/guide/',
				children: [
					'/guide/getting-started',
					'/guide/greenpress-configuration',
					'/guide/local-docker-composition',
					'/guide/customize',
					'/guide/permissions'
				]
			},
			{
				title: 'Themes',
				collapsable: false,
				path: '/themes/',
				children: [
					'/themes/custom-css',
				]
			},
			{
				title: 'Contribute',
				collapsable: false,
				path: '/guide/contribute/',
				children: [
					'/guide/contribute/getting-started',
					'/guide/contribute/locate-issues',
					'/guide/contribute/report-issues',
					'/guide/contribute/pull-request',
 					'/guide/contribute/working-with-git',
				]
			},
			{
				title: 'Services',
				collapsable: false,
				path: '/services/',
				children: [
					'/services/admin-panel/',
					'/services/blog-front/',
					'/services/assets/',
					'/services/content/',
					'/services/secrets/',
					'/services/auth/',
					'/services/drafts/'
				]
			},
			{
				title: 'Tools',
				collapsable: false,
				path: '/tools/',
				children: [
					'/tools/cli',
					'/tools/cli-service-pm2',
					'/tools/api-kit'
				]
			},
			{
				title: 'Test',
				collapsable: false,
				path: '/tests/',
				children: [
					'/tests/manual-tests',
				]
			},
		]
	},

	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-medium-zoom',
	]
}
