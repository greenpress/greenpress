<template>
	<div>
		<section v-for="post in posts" :key="post._id">
			<div v-if="post.thumbnail"><img :src="post.thumbnail"></div>
			<div>
				<h3>
					<nuxt-link
							:to="{params: {post: post.path, category: post.category.path ? post.category.path : post.category}, name: 'category-post'}">
						{{post.title}}
					</nuxt-link>
				</h3>
				<small class="created">{{post.created | dateTime}}</small>
				<div class="short" v-html="post.short"></div>
			</div>
		</section>
	</div>
</template>

<script>
  export default {
    props: {
      posts: Array,
    },
  }
</script>

<style scoped lang="scss">
	section {
		padding: 10px;
		margin: 10px 0;
		display: flex;
		flex-direction: row;

		&:nth-child(2n) {
			background-color: #ddd;
		}
	}

	img {
		padding-right: 20px;
		width: 200px;
	}

	.created {
		font-size: 70%;
	}

	.short {
		padding-top: 10px;
	}
</style>
