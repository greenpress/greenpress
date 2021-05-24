import { MUTATIONS, ACTIONS, DATA } from './consts'

export default {
  [ACTIONS.INIT] ({ dispatch, commit }, { category, post }) {
    commit(MUTATIONS.SET_CATEGORY_ID, category)
    commit(MUTATIONS.SET_POST_ID, post)

    return dispatch(ACTIONS.LOAD_POST)
  },
  [ACTIONS.LOAD_POST] ({ commit, state }) {
    return this.$axios.$get(
      `api/posts/${encodeURIComponent(state[DATA.CATEGORY_ID])}/${encodeURIComponent(state[DATA.POST_ID])}?target=front`,)
      .then(data => commit(MUTATIONS.SET_METADATA, data))
  }
}
