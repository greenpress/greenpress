import { reactive } from 'vue'
import router from '@/router'
import { computed } from 'vue'
import { api } from '@/services/api'
import { IAuthStore } from './types/auth-store'
import { IUser } from './types/user'

export const authStore = reactive<IAuthStore>({
  user: null,
  isLoaded: false,
  userPromise: null
})

const isAdmin = () => !!(authStore.user?.roles.includes('admin'))

export const useIsAdmin = () => {
  return computed(isAdmin)
}

export const logout = () => {
  authStore.user = null
  authStore.isLoaded = false
  authStore.userPromise = null
  api.post('/api/logout')
  router.push({ name: 'login' })
}

export const fetchAuthUser = async () => {
  if (authStore.user || authStore.userPromise) {
    return authStore.userPromise
  }

  try {
    authStore.userPromise = api.get<IUser>('/api/me').then(res => res.data)
    const user = await authStore.userPromise
    if (user?.roles.find(role => role === 'admin' || role === 'editor')) {
      authStore.user = user
      return user
    } else {
      throw new Error('user is not authorized')
    }
  } catch (err) {
    logout()
  } finally {
    authStore.isLoaded = true
  }
}

export const login = async ({ email, password }: { email: string, password: string }) => {
  const { data: { payload } } = await api.post<{ payload: { user: IUser } }>('/api/signin', {
    email,
    password,
    roles: ['admin', 'editor']
  })
  authStore.user = payload.user
  authStore.isLoaded = true
  authStore.userPromise = Promise.resolve(payload.user)
}
