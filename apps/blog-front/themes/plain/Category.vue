<template>
	<div class="category-page">
		<h1>{{category.name}}</h1>
    <section v-if="category.content" class="category-content" v-html="category.content"/>
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
