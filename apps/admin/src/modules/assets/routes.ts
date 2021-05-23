import EmptyRoute from '../core/components/layout/EmptyRoute.vue'
import StorageList from './StorageList.vue'
import AddStorage from './AddStorage.vue'
import EditStorage from './EditStorage.vue'
import { RouteRecordRaw } from 'vue-router'

const assetsRoutes: RouteRecordRaw = {
  path: 'assets',
  redirect: { name: 'storageList' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'storageList',
      component: StorageList
    },
    {
      path: 'new',
      name: 'addStorage',
      component: AddStorage
    },
    {
      path: ':storageId',
      name: 'editStorage',
      component: EditStorage
    }
  ]
}

export default assetsRoutes
