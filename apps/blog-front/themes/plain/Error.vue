<template>
	<div class="error-page" :status="error.statusCode">ERROR {{error.statusCode}}</div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      error: Object
    }
  }
</script>