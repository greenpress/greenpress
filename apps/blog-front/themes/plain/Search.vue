<template>
	<div class="search-page">
		<h1>Search results for "<i class="search-query">{{query}}</i>"</h1>
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