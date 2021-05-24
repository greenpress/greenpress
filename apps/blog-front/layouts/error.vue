<template>
	<Error :error="error"/>
</template>

<script>
  import Error from '~/.current_theme/Error'

  export default {
    name: 'error',
    props: ['error'],
    components: { Error }
  }
</script>

<style scoped>

</style>
