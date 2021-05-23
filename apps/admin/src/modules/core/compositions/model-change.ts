import { ref, watch } from 'vue'

export function useModelChange(modelValue: any, list, emit) {
  const selected = ref(null)
  watch(
    () => modelValue,
    () => {
      selected.value = list.value.find(item => item._id === modelValue.value)
    })

  return {
    selected,
    change: (item) => {
      selected.value = item
      emit('change', item)
    }
  }
}
