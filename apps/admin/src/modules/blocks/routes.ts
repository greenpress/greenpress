import EmptyRoute from '../core/components/layout/EmptyRoute.vue'
import Blocks from './Blocks.vue'
import CreateBlock from './CreateBlock.vue'
import EditBlock from './EditBlock.vue'
import {RouteRecordRaw} from 'vue-router'

const blocksRoutes: RouteRecordRaw = {
  path: 'blocks',
  redirect: {name: 'blocks'},
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'blocks',
      component: Blocks
    },
    {
      path: 'new',
      name: 'createBlock',
      component: CreateBlock
    },
    {
      path: ':blockId',
      name: 'editBlock',
      component: EditBlock
    }
  ]
}

export default blocksRoutes
