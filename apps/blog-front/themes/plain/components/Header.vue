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
