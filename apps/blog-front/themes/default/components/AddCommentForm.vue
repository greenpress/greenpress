<template>
	<form @submit.prevent="$emit('submit', content)">
		<div>
			<label><textarea v-model="content"/></label>
		</div>
		<button type="submit">Add Comment</button>
	</form>
</template>

<script>
  export default {
    data () {
      return {
        content: ''
      }
    }
  }
</script>
<style scoped>
</style>
