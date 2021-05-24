import { onMounted, ref } from '@nuxtjs/composition-api'

export function isFrontMounted () {
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })

  return mounted;
}
