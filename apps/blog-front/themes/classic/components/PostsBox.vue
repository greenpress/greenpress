<template>
	<section>
		<p v-if="post.thumbnail">
			<nuxt-link :to="getPostLinkParams(post)"><img :src="post.thumbnail" :alt="post.title"></nuxt-link>
		</p>
		<p class="category">
			<strong>
				<nuxt-link :to="{name: 'category', params: {category: post.category.path}}">
					{{post.category.name}}
				</nuxt-link>
			</strong>
		</p>
		<h3>
			<nuxt-link :to="getPostLinkParams(post)">{{post.title}}</nuxt-link>
		</h3>
		<p><small class="created">{{post.created | dateTime}}</small></p>
		<div class="short" v-html="post.short"></div>
	</section>
</template>

<script>
  import { getPostLinkParams } from '~/compositions/post-link-params'

  export default {
    props: {
      post: Object,
    },
    setup () {
      return {
        getPostLinkParams,
      }
    }
  }
</script>

<style scoped lang="scss">
	section {
		padding: 4% 1%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		width: 33.3%;
		text-align: center;
	}

	img {
		padding: 0 10px;
		width: 100%;

		&:hover {
			opacity: 0.6;
			transition: opacity 200ms ease-in-out;
		}
	}

	.category {
		padding-bottom: 10px;
		a {
			font-weight: bold;
			color: #ccc;
			font-size: 11px;
		}
	}

	h3 {
		font-weight: normal;
	}

	.created {
		font-size: 70%;
	}

	.short {
		padding: 10px 0;
	}

	@media all and (max-width: 720px) {
		section {
			width: 100%;
			padding: 0;
		}
		section:after {
			content: ' ';
			display: block;
			bottom: 0;
			margin-left: 15%;
			margin-bottom: 10px;
			width: 70%;
			height: 0;
			border-bottom: 1px solid #eee;
		}
	}
</style>
