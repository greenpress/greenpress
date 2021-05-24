<template>
  <div>
    <h1>Search results for "<i>{{ query }}</i>"</h1>
    <PostsList v-if="posts" :posts="posts" />
    <Loader v-else />
  </div>
</template>

<script>
  import PostsList from './components/PostsList'
  import Loader from './components/Loader'

  export default {
    components: { Loader, PostsList },
    props: {
      query: String,
      posts: Array
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

  h1 i {
    font-style: italic;
    font-weight: 300;
  }
</style>
