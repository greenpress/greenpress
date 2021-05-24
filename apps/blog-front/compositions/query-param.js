import { computed, useContext } from '@nuxtjs/composition-api'

export function useQueryParam (key) {
  const { query } = useContext()
	return computed(() => query.value ? query.value[key] : null)
}
