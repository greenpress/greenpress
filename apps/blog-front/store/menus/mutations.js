import {DATA, MUTATIONS} from './consts';

export default {
  [MUTATIONS.SET_MAIN_MENU]: (state, menu) => state[DATA.MAIN_MENU] = menu,
};

