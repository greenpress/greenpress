<template>
	<header>
		<Logo v-once :logo-url="config.logoUrl" :site-name="config.titleSuffix"/>
		<MainMenu/>
	</header>
</template>
<script>
  import Logo from './Logo'
  import MainMenu from './MainMenu'
  import { useConfiguration } from '~/compositions/app-configuration'

  export default {
    components: {
      Logo,
      MainMenu,
    },
    setup () {
      return { config: useConfiguration() }
    }
  }
</script>
<style scoped lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: black;
	}

	@media all and (max-width: 720px) {
		header {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
