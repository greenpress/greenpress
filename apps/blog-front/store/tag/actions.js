import { MUTATIONS, ACTIONS } from './consts'

export default {
  [ACTIONS.LOAD_POSTS] ({ commit }, tag) {
    return this.$axios.$get(`api/tags/${encodeURIComponent(tag)}`)
      .then(list => commit(MUTATIONS.SET_POSTS, list))
  },
}
