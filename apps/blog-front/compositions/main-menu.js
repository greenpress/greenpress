import { createNamespacedHelpers } from 'vuex-composition-helpers/dist'
import { ACTIONS, GETTERS, name } from '../store/menus/consts'

export function fetchMenuLinks ($store) {
  return $store.dispatch(name + '/' + ACTIONS.FETCH_MENU_LINKS)
}

export function useMenuLinks () {
  const { useGetters } = createNamespacedHelpers(name)
  const getters = useGetters([GETTERS.MAIN_MENU_LINKS])
  return getters[GETTERS.MAIN_MENU_LINKS]
}
