<template>
	<div class="error-container">
		<h2>
			ERROR {{error.statusCode}}
		</h2>
		<h3>{{error.message}}</h3>
	</div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      error: Object
    }
  }
</script>

<style scoped>
	.error-container {
		text-align: center;
		margin: 50px 0;
	}
</style>
