<template>
	<div class="post-breadcrumbs">
		<nuxt-link to="/">Home</nuxt-link> >
		<nuxt-link :to="{name: 'category', params: {category: post.category.path}}">{{post.category.name}}</nuxt-link> >
		<span class="current-post-title">{{post.title}}</span>
	</div>
</template>
<script>
  export default {
    props: {
      post: Object,
    },
  }
</script>
