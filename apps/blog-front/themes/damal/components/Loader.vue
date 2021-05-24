<template>
	<div class="loader">
		<Spinner/>
	</div>
</template>

<script>
  import Spinner from './Spinner'

  export default {
    components: { Spinner },
    name: 'Loader'
  }
</script>

<style lang="scss" scoped>
	.loader {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 100px 0;
	}
</style>
