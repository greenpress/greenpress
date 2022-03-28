import { RouteRecordRaw } from 'vue-router'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const postsRoutes: RouteRecordRaw = {
  path: 'posts',
  redirect: { name: 'posts' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'posts',
      component: async () => (await import('./Posts.vue')).default
    },
    {
      path: 'new',
      name: 'createPost',
      component: async () => (await import('./CreatePost.vue')).default
    },
    {
      path: ':postId',
      name: 'editPost',
      component: async () => (await import('./EditPost.vue')).default
    }
  ]
}

export default postsRoutes
