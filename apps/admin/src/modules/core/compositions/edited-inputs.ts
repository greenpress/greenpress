import { computed } from 'vue'

export function useEditedInputs(editedObj, originalObj, propsMap = []) {
  return propsMap.reduce((comps, prop) => {
    comps[prop] = computed(() => editedObj[prop] === null ? originalObj[prop] : editedObj[prop])
    return comps
  }, {} as any)
}

export function useEditedInputModels(editedObj, originalObj, propsMap: string[] = []) {
  return propsMap.reduce((comps, prop) => {
    comps[prop] = computed({
      get: () => editedObj[prop] === null ? originalObj[prop] : editedObj[prop],
      set: value => editedObj[prop] = value
    })
    return comps
  }, {} as any)
}
