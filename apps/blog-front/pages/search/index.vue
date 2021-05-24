<template>
	<Search :query="query" :posts="posts"/>
</template>

<script>
  import Search from '~/.current_theme/Search'
  import useSearch from '../../compositions/search-state'
  import { useQueryParam } from '../../compositions/query-param'

  export default {
    components: { Search },
    setup () {
      const query = useQueryParam('q');
      return {
        ...useSearch(query),
        query,
      }
    }
  }
</script>
