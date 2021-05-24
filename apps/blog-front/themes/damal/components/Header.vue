<template>
	<header>
		<div class="top-header">
			<Logo v-once :logo-url="config.logoUrl" :site-name="config.titleSuffix"/>
			<SearchForm class="search-form"/>
		</div>
		<MainMenu/>
	</header>
</template>
<script>
  import Logo from './Logo'
  import SearchForm from './SearchForm'
  import MainMenu from './MainMenu'
  import { useConfiguration } from '~/compositions/app-configuration'

  export default {
    components: {
      Logo,
      SearchForm,
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
		flex-direction: column;
	}

	.top-header {
		display: flex;
		align-items: center;
	}

	.top-header .search-form {
		flex: 1;
	}

	@media all and (max-width: 720px) {
		header {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
		}
		.top-header {
			width: 100%;
			flex-direction: column;
			justify-content: flex-start;
		}
	}
</style>
