<template>
	<div class="posts-group">
		<div class="row two-in-row">
			<PostBox :post="posts[0]"/>
			<PostBox v-if="posts[1]" :post="posts[1]"/>
		</div>
		<div class="row three-in-row" v-if="posts.length > 2">
			<PostBox v-if="posts[2]" :post="posts[2]"/>
			<PostBox v-if="posts[3]" :post="posts[3]"/>
			<PostBox v-if="posts[4]" :post="posts[4]"/>
		</div>
	</div>
</template>

<script>
  import PostBox from './PostBox'

  export default {
    components: { PostBox },
    props: {
      posts: Array,
    }
  }
</script>
<style scoped lang="scss">
	.row {
		align-items: center;
		justify-content: center;

		&.two-in-row {
			> * {
				width: 50%;
				flex: inherit;
			}
		}

		&.three-in-row {
			> * {
				width: 33%;
				flex: inherit;
			}
		}
	}


	@media screen and (max-width: 600px) {
		.row {
			flex-direction: column;
			&.two-in-row, &.three-in-row {
				> * {
					width: 95%;
				}
			}
		}
		.posts-group {
			margin: 0;
		}
	}


</style>
