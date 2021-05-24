<template>
	<div>
    <main v-html="content" />
    <PostsList :posts="posts"/>
	</div>
</template>
<script>
	import PostsList from './components/PostsList';

	export default {
		props: {
      content: String,
      posts: Array,
		},
		components: {PostsList}
	}
</script>

<style scoped>
  main {
    padding: 10px;
  }
</style>
