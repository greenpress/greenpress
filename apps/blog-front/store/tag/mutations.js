import { DATA, MUTATIONS } from './consts'

export default {
  [MUTATIONS.SET_POSTS]: (state, list) => state[DATA.POSTS] = list,
}
