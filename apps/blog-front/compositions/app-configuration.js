import { useContext, computed } from '@nuxtjs/composition-api'

export function fetchConfiguration ($store) {
	return $store.dispatch('init')
}

export function useConfiguration () {
	const { store } = useContext()
	return computed(() => store.state.config)
}
