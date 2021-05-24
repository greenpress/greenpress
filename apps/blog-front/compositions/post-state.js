import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import { ACTIONS, DATA, name } from '../store/post/consts'

const { useState } = createNamespacedHelpers(name)

export function usePostState () {
  return useState({
    post: DATA.METADATA
  })
}

export function useFetchPost ($store, $route, error) {
  return $store.dispatch(name + '/' + ACTIONS.INIT, $route.params).catch(() => {
    error({ statusCode: 404, message: 'Post not found' })
  })
}
