import { MUTATIONS, ACTIONS, DATA } from './consts'

export default {
  [ACTIONS.INIT] ({ dispatch, commit, state }, category) {
    if (state[DATA.METADATA].path !== category) {
      commit(MUTATIONS.SET_METADATA, {})
      commit(MUTATIONS.SET_POSTS, [])
    }
    return Promise.all([
      dispatch(ACTIONS.LOAD_POSTS, category),
      dispatch(ACTIONS.LOAD_CATEGORY, category)
    ])
  },
  [ACTIONS.LOAD_POSTS] ({ commit }, category) {
    return this.$axios.$get(`api/categories/${encodeURIComponent(category)}/posts?target=front`)
      .then(list => commit(MUTATIONS.SET_POSTS, list))
  },
  [ACTIONS.LOAD_CATEGORY] ({ commit }, category) {
    return this.$axios.$get(`api/categories/${encodeURIComponent(category)}`)
      .then(metadata => commit(MUTATIONS.SET_METADATA, metadata))
  }
}
