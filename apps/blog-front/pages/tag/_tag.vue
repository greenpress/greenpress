<template>
	<Tag :posts="posts" :tag="$route.params.tag"/>
</template>

<script>
  import Tag from '~/.current_theme/Tag'
  import { fetchTagPosts, useTagPosts } from '../../compositions/tag-posts'

  export default {
    components: { Tag },
    asyncData ({ store, route }) {
      return fetchTagPosts(store, route)
    },
    setup () {
      return useTagPosts()
    },
  }
</script>
