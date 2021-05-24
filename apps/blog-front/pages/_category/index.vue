<template>
	<Category :category="metadata" :posts="posts"/>
</template>

<script>
  import Category from '~/.current_theme/Category'
  import { useCategoryState, fetchCategory } from '../../compositions/category-state'

  export default {
    components: { Category },
    asyncData ({ store, route, error }) {
      return fetchCategory(store, route, error)
    },
    setup () {
      return useCategoryState()
    }
  }
</script>
