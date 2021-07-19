<template>
	<div class="tag-page">
		<h1>Tag: <i class="current-tag">{{tag}}</i></h1>
		<PostsList :posts="posts"/>
	</div>
</template>

<script>
  import PostsList from './components/PostsList'

  export default {
    components: { PostsList },
    props: {
      tag: String,
      posts: Array,
    },
    head () {
      return {
        title: this.tag,
        meta: [
          { hid: 'description', name: 'description', content: this.tag }
        ]
      }
    }
  }
</script>