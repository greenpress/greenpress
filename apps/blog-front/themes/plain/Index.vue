<template>
<div class="home-page">
	<main class="main-content" v-html="content" />
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