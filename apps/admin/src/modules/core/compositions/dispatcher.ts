import { ref } from 'vue'

export function useDispatcher<T = any>(callback, defaultValue: T | null = null) {
  const result = ref<T>(defaultValue)
  const loading = ref<boolean>(true)
  const error = ref<any>(null)

  const caller = async () => {
    try {
      result.value = await callback()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  caller()

  return {
    result,
    loading,
    error,
    retry: caller
  }
}
