<template>
	<div class="content">
		<h1>{{category.name}}</h1>
		<section v-if="category.content" v-html="category.content"/>
		<PostsList :posts="posts"/>
	</div>
</template>

<script>
  import PostsList from './components/PostsList'

  export default {
    components: { PostsList },
    props: {
      category: Object,
      posts: Array,
    },
    head () {
      return {
        title: this.category.name,
        meta: [
          { hid: 'description', name: 'description', content: this.category.name }
        ]
      }
    }
  }
</script>

<style scoped>
	h1 {
		padding: 10px;
	}

	section /deep/ p {
		padding: 10px 0;
	}
</style>
