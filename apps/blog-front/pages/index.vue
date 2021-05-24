<template>
  <Index :posts="posts" :tags="tags" :content="content" />
</template>

<script>
  import Index from '~/.current_theme/Index'
  import { useHomeState, fetchHomeData } from '~/compositions/home-state'

  export default {
    components: {
      Index
    },
    asyncData ({ store }) {
      return fetchHomeData(store)
    },
    setup () {
      return useHomeState()
    }
  }
</script>
