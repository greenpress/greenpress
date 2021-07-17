<template>
	<div class="posts-list">
		<section v-for="post in posts" :key="post._id" class="post-item">
			<div v-if="post.thumbnail" class="post-thumbnail"><img :src="post.thumbnail" class="post-thumbnail-img"></div>
			<div class="post-item-contents">
				<h3 class="post-item-title">
					<nuxt-link 
						class="pos-item-link"
						:to="{params: {post: post.path, category: post.category.path ? post.category.path : post.category}, name: 'category-post'}">
						{{post.title}}
					</nuxt-link>
				</h3>
				<small class="post-item-created">{{post.created | dateTime}}</small>
				<div class="post-item-short" v-html="post.short"></div>
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