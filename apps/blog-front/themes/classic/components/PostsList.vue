<template>
	<div class="posts-list">
		<PostsBox v-for="post in posts" :key="post._id" :post="post"/>
	</div>
</template>

<script>
  import PostsBox from './PostsBox'

  export default {
    components: { PostsBox },
    props: {
      posts: Array,
    },
  }
</script>

<style scoped lang="scss">
	.posts-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
    padding-top: 10px;
	}
	@media all and (max-width: 720px) {
		.posts-list {
			flex-direction: column;
		}
	}
</style>
