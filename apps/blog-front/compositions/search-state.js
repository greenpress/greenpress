import { onServerPrefetch, ref, watchEffect, getCurrentInstance } from '@nuxtjs/composition-api'


export default function useSearch(query) {
  const { $axios } = getCurrentInstance().proxy;
  const posts = ref(null);

  function getPosts() {
    if (query.value && query.value.trim().length < 2) {
      posts.value = []
      return Promise.resolve()
    }
    return $axios.$get('api/posts', { params: { q: query.value, target: 'front' } }).then(list => {
      posts.value = list
    })
  }

  onServerPrefetch(getPosts)
  watchEffect(getPosts)

  return {
    posts
  }
}
