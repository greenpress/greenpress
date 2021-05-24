<template>
  <div>
    <main v-html="content" />
    <template v-if="posts && !posts.length">No posts yet.</template>
    <Loader v-if="!posts" />
    <template v-else-if="posts.length">
      <TopPostsGroup :posts="topPosts" />
      <TagsBox :tags="tags" />
      <PostsList :posts="otherPosts" />
    </template>
  </div>
</template>
<script>
  import { computed, useMeta, defineComponent } from '@nuxtjs/composition-api'
  import TopPostsGroup from './components/TopPostsGroup'
  import PostsList from './components/PostsList'
  import TagsBox from './components/TagsBox'
  import { useConfiguration } from '~/compositions/app-configuration'
  import Loader from './components/Loader'

  export default defineComponent({
    props: {
      content: String,
      posts: Array,
      tags: Array
    },
    head: {},
    components: { Loader, TagsBox, PostsList, TopPostsGroup },
    setup (props) {
      const config = useConfiguration()
      const topPosts = computed(() => {
        return props.posts ? props.posts.filter((post, index) => index < 5) : []
      })
      const otherPosts = computed(() => {
        const [a, b, c, d, e, ...otherPosts] = props.posts || []
        return otherPosts
      })
      useMeta({
        titleTemplate: `${config.value.titleSuffix}`
      })
      return {
        topPosts,
        otherPosts
      }
    }
  })
</script>

<style scoped>
  main {
    padding: 10px;
  }
</style>
