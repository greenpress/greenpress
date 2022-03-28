import { RouteRecordRaw } from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const assetsRoutes: RouteRecordRaw = {
  path: 'assets',
  redirect: { name: 'storageList' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'storageList',
      component: async () => (await import('./StorageList.vue')).default
    },
    {
      path: 'new',
      name: 'addStorage',
      component: async () => (await import('./AddStorage.vue')).default
    },
    {
      path: ':storageId',
      name: 'editStorage',
      component: async () => (await import('./EditStorage.vue')).default
    }
  ]
}

export default assetsRoutes
