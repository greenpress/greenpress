import { reactive } from 'vue'
import router from '../../../router'
import { api } from '../../../services/api'
import { IAuthStore } from './types/auth-store'
import { IUser } from './types/user'

export const authStore = reactive<IAuthStore>({
  user: null,
  isLoaded: false,
  userPromise: null
})

export const logout = () => {
  authStore.user = null
  authStore.isLoaded = false
  authStore.userPromise = null
  api.post('/api/logout')
  router.push({ name: 'login' })
}

export const updateProfile = async (changes: Partial<IUser>) => {
  authStore.user = await api.post<IUser>('/api/me', changes).then(res => res.data)
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
