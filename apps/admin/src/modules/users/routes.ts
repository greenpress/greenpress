import EmptyRoute from '../core/components/layout/EmptyRoute.vue'
import Users from './Users.vue'
import EditUser from './EditUser.vue'
import CreateUser from './CreateUser.vue'
import UpdateProfile from './UpdateProfile.vue'

const usersRoutes = {
  path: 'users',
  redirect: { name: 'users' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'users',
      component: Users
    },
    {
      path: 'me',
      name: 'updateProfile',
      component: UpdateProfile
    },
    {
      path: 'new',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: ':userId',
      name: 'editUser',
      component: EditUser
    }
  ]
}

export default usersRoutes
