<template>
	<div>
		<section v-for="post in posts" :key="post._id" @click="navigate(post)">
			<div v-if="post.thumbnail"><img :src="post.thumbnail" :alt="post.title"></div>
			<div>
				<h3>
					<nuxt-link :to="getPostLinkParams(post)">{{post.title}}</nuxt-link>
				</h3>
				<small class="created">{{post.created | dateTime}}</small>
				<div class="short" v-html="post.short"></div>
			</div>
		</section>
	</div>
</template>

<script>
  import { getPostLinkParams, usePostNavigation } from '../../../compositions/post-link-params'

  export default {
    props: {
      posts: Array,
    },
    setup () {

      return {
        getPostLinkParams,
        navigate: usePostNavigation()
      }
    }
  }
</script>

<style scoped lang="scss">
	section {
		padding: 10px;
		margin: 10px 0;
		display: flex;
		flex-direction: row;

		&:nth-child(2n) {
			background-color: #ddd;
		}
	}

	img {
		padding: 0 10px;
		width: 200px;
	}

	.created {
		font-size: 70%;
	}

	.short {
		padding-top: 10px;
	}
</style>
