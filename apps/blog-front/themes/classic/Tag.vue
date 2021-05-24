<template>
	<div>
		<h1>Tag: {{tag}}</h1>
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

<style scoped>
	h1 {
		padding: 10px;
	}

	section {
		padding: 10px;
		margin: 10px;
		border-top: 1px solid #ccc;
		border-radius: 5px;
	}
</style>
