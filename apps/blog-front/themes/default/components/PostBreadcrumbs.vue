<template>
	<div class="breadcrumbs">
		<nuxt-link to="/">Home</nuxt-link> >
		<nuxt-link :to="{name: 'category', params: {category: post.category.path}}">{{post.category.name}}</nuxt-link> >
		<span>{{post.title}}</span>
	</div>
</template>
<script>
  export default {
    props: {
      post: Object,
    },
  }
</script>
<style scoped>
	.breadcrumbs {
		padding-bottom: 10px;
	}
</style>
