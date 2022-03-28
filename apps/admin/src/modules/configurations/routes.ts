import { RouteRecordRaw } from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const configurationsRoutes: RouteRecordRaw = {
  path: '/configurations',
  redirect: { name: 'configurations' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'configurations',
      component: async () => (await import('./Configurations.vue')).default
    },
    {
      path: ':key',
      name: 'editConfiguration',
      component: async () => (await import('./EditConfiguration.vue')).default
    }
  ]
}

export default configurationsRoutes
