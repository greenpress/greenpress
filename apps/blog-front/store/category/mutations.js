import {DATA, MUTATIONS} from './consts';

export default {
  [MUTATIONS.SET_METADATA]: (state, data) => state[DATA.METADATA] = data,
  [MUTATIONS.SET_POSTS]: (state, list) => state[DATA.POSTS] = list,
};
