import EmptyRoute from '../core/components/layout/EmptyRoute.vue'
import { RouteRecordRaw } from 'vue-router'

const EditMenuAsync = async () => (await import('./EditMenu.vue')).default;

const menusRoutes: RouteRecordRaw = {
  path: 'menus',
  redirect: { name: 'menus' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'menus',
      component: async () => (await import('./Menus.vue')).default
    },
    {
      path: 'new',
      name: 'createMenu',
      component: EditMenuAsync
    },
    {
      path: ':menuName',
      name: 'editMenu',
      component: EditMenuAsync
    }
  ]
}

export default menusRoutes
