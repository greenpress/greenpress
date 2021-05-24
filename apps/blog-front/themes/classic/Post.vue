<template>
	<main v-if="post" class="post">
		<section class="post-header">
			<h1>{{post.title}}</h1>
			<p class="image-container"><img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title"></p>
		</section>
		<article>
			<PostBreadcrumbs :post="post"/>
			<p>
				<small>{{authors}} | {{post.created | dateTime}}</small>
			</p>
			<section class="post-content"
			         v-for="(content, index) in post.contents"
			         :key="index"
			         v-html="content">
			</section>
		</article>
		<div class="tags-container" v-if="post.tags.length">
			<div>Related tags:&nbsp;</div>
			<Tags :tags="post.tags"/>
		</div>
		<SharePost :post="post"/>
		<PostComments :post="post"/>
	</main>
	<Loader v-else/>
</template>

<script>
  import { computed } from '@nuxtjs/composition-api'
  import PostBreadcrumbs from './components/PostBreadcrumbs'
  import SharePost from './components/SharePost'
  import Tags from './components/Tags'
  import PostComments from './components/PostComments'
  import Loader from './components/Loader'

  export default {
    props: {
      post: Object,
    },
    components: { Loader, PostComments, Tags, SharePost, PostBreadcrumbs },
    setup (props) {
      return {
        authors: computed(() => props.post.authors ? props.post.authors.map(a => a.name).join(', ') : '')
      }
    }
  }
</script>

<style scoped lang="scss">
	.post-header {
		background-color: #000;

		h1 {
			color: #fff;
			padding: 10px;
			font-size: 28px;
			font-weight: normal;
		}

		.image-container {
			text-align: center;
		}

		img {
			max-width: 100%;
			max-height: 500px;
		}
	}

	article {
		padding: 0 10px;
	}

	.post-content {
		padding: 10px 0;
		line-height: 150%;
	}

	.tags-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 10px;
	}
</style>
