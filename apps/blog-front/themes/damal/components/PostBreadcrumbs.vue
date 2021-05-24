<template>
	<div class="breadcrumbs">
		<nuxt-link to="/">{{config.name}}</nuxt-link> >
		<nuxt-link :to="{name: 'category', params: {category: post.category.path}}">{{post.category.name}}</nuxt-link> >
		<span>{{post.title}}</span>
	</div>
</template>
<script>
  import { useConfiguration } from '~/compositions/app-configuration'

  export default {
    props: {
      post: Object,
    },
    setup () {
      return { config: useConfiguration() }
    }
  }
</script>
<style scoped>
	.breadcrumbs {
		padding-bottom: 10px;
	}
</style>
