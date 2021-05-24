<template>
	<div class="post">
		<PostBreadcrumbs :post="post"/>
		<article>
			<h1>{{post.title}}</h1>
			<p>
				<small>{{authors}} | {{post.created | dateTime}}</small>
			</p>
			<section class="post-content" v-for="(content, index) in post.contents" :key="index" v-html="content"/>
		</article>
		<PostComments :comments="comments"/>
	</div>
</template>

<script>
  import PostBreadcrumbs from './components/PostBreadcrumbs'
  import PostComments from './components/PostComments'

  export default {
    props: {
      post: Object,
      comments: Array
    },
    components: { PostComments, PostBreadcrumbs },
    computed: {
      authors () {
        return this.post.authors ? this.post.authors.map(a => a.name).join(', ') : ''
      }
    },
    head () {
      return {
        title: this.post.title + ' - ' + this.post.category.name,
        meta: [
          { hid: 'description', name: 'description', content: this.post.title }
        ]
      }
    }
  }
</script>

<style scoped>
	.post {
		padding: 10px;
	}

	.post-content {
		padding: 10px 0;
	}
</style>
