import EditPost from './EditPost.vue'
import CreatePost from './CreatePost.vue'
import EmptyRoute from '../core/components/layout/EmptyRoute.vue'
import Posts from './Posts.vue'
import { RouteRecordRaw } from 'vue-router'

const postsRoutes: RouteRecordRaw = {
  path: 'posts',
  redirect: { name: 'posts' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'posts',
      component: Posts
    },
    {
      path: 'new',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: ':postId',
      name: 'editPost',
      component: EditPost
    }
  ]
}

export default postsRoutes
