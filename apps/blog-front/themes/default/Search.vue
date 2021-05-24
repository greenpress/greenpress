<template>
	<div>
		<h1>Search results for "<i>{{query}}</i>"</h1>
		<PostsList :posts="posts"/>
	</div>
</template>

<script>
  import PostsList from './components/PostsList'

  export default {
    components: { PostsList },
    props: {
      query: String,
      posts: Array,
    },
    head () {
      const title = 'Search results for query: ' + this.query
      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: title }
        ]
      }
    }
  }
</script>

<style scoped>
	h1 {
		padding: 10px;
	}
</style>
