import { RouteRecordRaw } from 'vue-router'
import Drafts from '@/modules/drafts/Drafts.vue'

const draftsRoutes: RouteRecordRaw = {
  path: '/drafts',
  name: 'drafts',
  component: Drafts
}

export default draftsRoutes
