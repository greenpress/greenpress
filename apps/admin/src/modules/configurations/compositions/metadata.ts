import { reactive } from 'vue'
import { useEditedInputModels } from '../../core/compositions/edited-inputs'

const configurationKeysTypes = {
	logoUrl: ['text', 'upload']
}

export function useEditMetadata(metadata) {
  const keys: string[] = Object.keys(metadata)
  const editedValues = reactive(keys.reduce((values, key) => {
    values[key] = null
    return values
  }, {}))
  const updated = reactive(useEditedInputModels(editedValues, metadata, keys))
  const valuesTypes = reactive(keys.reduce((types, key) => {
	  const options = configurationKeysTypes[key] || [(typeof updated[key] === 'number' ? 'number' : 'text')]
	  types[key] = {
		  options,
		  selected: options[0]
	  }
	  return types
  }, {}))

  return {
    keys,
    valuesTypes,
    edited: editedValues,
    updated
  }
}
