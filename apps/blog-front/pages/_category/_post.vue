<template>
  <Post :post="post" />
</template>
<script>
  import Post from '~/.current_theme/Post'
  import { useFetchPost, usePostState } from '../../compositions/post-state'

  export default {
    components: { Post },
    asyncData (context) {
      return useFetchPost(context.store, context.route, context.error)
    },
    setup () {
      return usePostState()
    },
    head () {
      const description = this.post.short ?
        this.post.short
          .substr(0, 100)
          .replace(/<[^>]*>/g, '') :
        this.post.title
      return {
        title: this.post.title + ' - ' + this.post.category.name,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'keywords', name: 'keywords', content: this.post.tags.join(', ') },
          { hid: 'og:title', name: 'og:title', content: this.post.title },
          { hid: 'og:description', name: 'og:description', content: description },
          { hid: 'og:image', name: 'og:image', content: this.post.thumbnail || '' }
        ]
      }
    }
  }
</script>
