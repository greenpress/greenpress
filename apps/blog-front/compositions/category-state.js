import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import { ACTIONS, DATA, name } from '../store/category/consts'

const { useState } = createNamespacedHelpers(name)

export function fetchCategory ($store, $route, error) {
  const category = $route.params.category
  return $store.dispatch(name + '/' + ACTIONS.INIT, category).catch(() => {
    error({ statusCode: 404, message: 'Category not found' })
  })
}

export function useCategoryState () {
  return useState({
    posts: DATA.POSTS,
    metadata: DATA.METADATA
  })
}
