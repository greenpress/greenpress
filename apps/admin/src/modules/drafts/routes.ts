import { RouteRecordRaw } from 'vue-router'

const draftsRoutes: RouteRecordRaw = {
  path: '/drafts',
  name: 'drafts',
  component: async () => (await import('./Drafts.vue')).default
}

export default draftsRoutes
