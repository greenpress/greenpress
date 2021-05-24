import { computed } from '@nuxtjs/composition-api'

export function locationHref () {
  return computed(() => location.href)
}
