import {RouteRecordRaw} from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const layoutsRoutes: RouteRecordRaw = {
  path: 'layouts',
  redirect: {name: 'layouts'},
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'layouts',
      component: async () => (await import('./Layouts.vue')).default
    },
    {
      path: 'new',
      name: 'createLayout',
      component: EmptyRoute
    },
    {
      path: ':kind',
      name: 'editLayout',
      component: async () => (await import('./EditLayout.vue')).default
    }
  ]
}

export default layoutsRoutes
