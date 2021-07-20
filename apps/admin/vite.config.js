import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

const BASE_URL = process.env.BASE_URL || '/gp-admin';

export default defineConfig({
	json: {
		stringify: true
	},
  	base: BASE_URL,
	server: {
		port: process.env.PORT || 3001,
		proxy: {
			'/api': process.env.VUE_APP_MAIN_APP_URL || 'http://localhost:3000'
		}
	},
	define: {
		BASE_URL: `"${BASE_URL}"`
	},
	plugins: [
		vue(),
		styleImport({
			libs: [{
				libraryName: 'element-plus',
				esModule: true,
				ensureStyleFile: true,
				resolveStyle: (name) => {
					name = name.slice(3)
					return `element-plus/packages/theme-chalk/src/${name}.scss`
				},
				resolveComponent: (name) => {
					return `element-plus/lib/${name}`
				}
			}]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})

