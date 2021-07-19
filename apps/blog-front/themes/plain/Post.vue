<template>
	<div class="post-page">
		<PostBreadcrumbs :post="post"/>
		<article>
			<h1>{{post.title}}</h1>
			<p class="authors">
				<small>{{authors}} | <span class="post-created">{{post.created | dateTime}}</span></small>
			</p>
			<section class="post-content" v-for="(content, index) in post.contents" :key="index" v-html="content"/>
		</article>
	</div>
</template>

<script>
  import PostBreadcrumbs from './components/PostBreadcrumbs'

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