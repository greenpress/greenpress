import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import { ACTIONS, DATA, name } from '~/store/tag/consts'

const { useState } = createNamespacedHelpers(name)

export function fetchTagPosts ($store, $route) {
  return $store.dispatch(name + '/' + ACTIONS.LOAD_POSTS, $route.params.tag)
}

export function useTagPosts () {
  return useState({
    posts: DATA.POSTS
  })
}
