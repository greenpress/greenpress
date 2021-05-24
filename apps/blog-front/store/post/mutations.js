import {DATA, MUTATIONS} from './consts';

export default {
  [MUTATIONS.SET_METADATA]: (state, data) => state[DATA.METADATA] = data,
  [MUTATIONS.SET_POST_ID]: (state, id) => state[DATA.POST_ID] = id,
  [MUTATIONS.SET_CATEGORY_ID]: (state, id) => state[DATA.CATEGORY_ID] = id,
};
