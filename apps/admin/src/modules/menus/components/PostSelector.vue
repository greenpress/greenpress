<template>
	<label class="post-selector">
		Search Post by Title:
		<el-input v-model="val" @input="onInput" name="post-title"/>
		<ul class="options-list" v-if="searchPostsList.length">
			<li v-for="post in searchPostsList" :key="post._id" @click="select(post)">{{post.title}}</li>
		</ul>
	</label>
</template>
<script>
  import { computed } from 'vue'
  import { usePostsSearch } from '../../posts/compositions/posts'

  export default {
    name: 'PostSelector',
    props: {
      value: String,
      title: String,
    },
    setup(props, { emit }) {
      const { searchPostsList, selectedPost, search } = usePostsSearch()

      return {
        val: computed({
          get: () => {
            return selectedPost.title || props.title
          },
          set: (value) => {
            selectedPost.title = value
          }
        }),
        onInput(value) {
          if (value.length > 2) {
            // do API search for posts, and show autocomplete
            search(value)
          }
        },
        searchPostsList,
        select(post) {
          selectedPost.title = post.title
          selectedPost.value = post._id
          searchPostsList.value = []
          emit('change', post._id)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
	.post-selector {
		position: relative;

		.options-list {
			background-color: #fff;
			border: 1px solid #ccc;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			z-index: 1;
			list-style: none;
			padding: 0;

			li {
				padding: 5px 10px;
				margin: 0;
				cursor: pointer;

				&:hover, &.active {
					background-color: #eee;
				}
			}
		}
	}
</style>
