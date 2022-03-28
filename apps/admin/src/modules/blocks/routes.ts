import {RouteRecordRaw} from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const blocksRoutes: RouteRecordRaw = {
  path: 'blocks',
  redirect: {name: 'blocks'},
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'blocks',
      component: async () => (await import('./Blocks.vue')).default
    },
    {
      path: 'new',
      name: 'createBlock',
      component: async () => (await import('./CreateBlock.vue')).default
    },
    {
      path: ':blockId',
      name: 'editBlock',
      component: async () => (await import('./EditBlock.vue')).default
    }
  ]
}

export default blocksRoutes
