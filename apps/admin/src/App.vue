<template>
	<div id="app">
		<router-view v-if="config"/>
	</div>
</template>
<script lang="ts" setup>
import {useAppConfiguration} from './modules/configurations/store/app-configuration'
import {watch} from 'vue'
import {translate, loadLanguageAsync} from './plugins/i18n'

const config = useAppConfiguration()

watch(() => config.value?.metadata && config.value.metadata.language, async (language) => {
	await loadLanguageAsync(language)
	document.dir = translate('appDirection')
})
</script>
<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 100%;
}

html {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
	'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	height: 100%;
}

body {
	height: 100%;
}

.main h1, .main h2 {
	padding: 10px;
	margin: 0;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}
</style>
