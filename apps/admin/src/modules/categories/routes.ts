import { RouteRecordRaw } from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const categoriesRoutes: RouteRecordRaw = {
  path: 'categories',
  redirect: { name: 'categories' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'categories',
      component: async () => (await import('./Categories.vue')).default
    },
    {
      path: 'new',
      name: 'createCategory',
      component: async () => (await import('./CreateCategory.vue')).default
    },
    {
      path: ':categoryPath',
      name: 'editCategory',
      component: async () => (await import('./EditCategory.vue')).default
    }
  ]
};

export default categoriesRoutes
