<template>
	<nuxt-link to="/"><img class="logo" :src="logoUrl || '/logo.png'" :alt="siteName"></nuxt-link>
</template>
<script>
  export default {
    name: 'Logo',
    props: {
      logoUrl: String,
      siteName: String
    }
  }
</script>
<style scoped>
	a {
		display: block;
		padding: 10px 0;
	}

	.logo {
		width: 150px;
	}


	@media all and (max-width: 720px) {
		a {
			text-align: center;
			flex: 1;
			padding: 5px 0;
		}

		.logo {
			max-width: 100%;
			max-height: 100px;
		}
	}
</style>
