import { DATA, MUTATIONS } from './consts'

export default {
  [MUTATIONS.SET_CONTENT]: (state, content) => state[DATA.CONTENT] = content,
  [MUTATIONS.SET_POSTS]: (state, list) => state[DATA.POSTS] = list,
  [MUTATIONS.SET_TAGS]: (state, list) => state[DATA.TAGS] = list,
}
