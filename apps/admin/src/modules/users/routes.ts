import EmptyRoute from '../core/components/layout/EmptyRoute.vue'

const usersRoutes = {
  path: 'users',
  redirect: { name: 'users' },
  component: EmptyRoute,
  children: [
    {
      path: '',
      name: 'users',
      component: async () => (await import('./Users.vue')).default
    },
    {
      path: 'me',
      name: 'updateProfile',
      component: async () => (await import('./UpdateProfile.vue')).default
    },
    {
      path: 'new',
      name: 'createUser',
      component: async () => (await import('./CreateUser.vue')).default
    },
    {
      path: ':userId',
      name: 'editUser',
      component: async () => (await import('./EditUser.vue')).default
    }
  ]
}

export default usersRoutes
