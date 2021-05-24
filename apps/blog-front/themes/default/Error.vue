<template>
	<div>ERROR {{error.statusCode}}</div>
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

</style>
