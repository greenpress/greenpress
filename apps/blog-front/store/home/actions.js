import { MUTATIONS, ACTIONS, DATA } from './consts'

export default {
  [ACTIONS.INIT] ({ dispatch }) {
    return Promise.all([
      dispatch(ACTIONS.LOAD_HOME_PAGE),
      dispatch(ACTIONS.LOAD_POSTS),
      dispatch(ACTIONS.LOAD_TAGS)
    ])
  },
  [ACTIONS.LOAD_HOME_PAGE] ({ commit }) {
    return this.$axios.$get(`api/categories/-`)
      .then(({ content } = {}) => commit(MUTATIONS.SET_CONTENT, content || ''))
      .catch(() => {})
  },
  [ACTIONS.LOAD_POSTS] ({ commit, state }) {
    if (state[DATA.POSTS] && state[DATA.POSTS].length) {
      return Promise.resolve(state[DATA.POSTS])
    }
    return this.$axios.$get(`api/posts?target=front&populate[]=category`)
      .then(list => commit(MUTATIONS.SET_POSTS, list))
  },
  [ACTIONS.LOAD_TAGS] ({ commit, state }) {
    if (state[DATA.TAGS].length) {
      return Promise.resolve(state[DATA.TAGS])
    }
    return this.$axios.$get(`api/tags`)
      .then(list => commit(MUTATIONS.SET_TAGS, list))
  }
}
