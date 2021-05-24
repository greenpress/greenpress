import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import { ACTIONS, DATA, name } from '../store/home/consts'

const { useState } = createNamespacedHelpers(name)

export function fetchHomeData ($store) {
  return $store.dispatch(name + '/' + ACTIONS.INIT)
}

export function useHomeState () {
  return useState({
    content: DATA.CONTENT,
    posts: DATA.POSTS,
    tags: DATA.TAGS,
  })
}
