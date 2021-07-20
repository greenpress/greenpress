import { reactive } from 'vue'
import { useEditedInputModels } from '../../core/compositions/edited-inputs'

const fileUploaderConfigProperty = ['text', 'upload'];

const configurationKeysTypes = {
  logoUrl: fileUploaderConfigProperty,
  themeStylesUrl: fileUploaderConfigProperty,
}

const titles = {
  name: 'Website Name',
  language: 'Language',
  direction: 'Text Direction',
  description: 'Description',
  logoUrl: 'Logo',
  themeStylesUrl: 'Theme CSS URL'
};

const placeholders = {
  language: 'en | he',
  direction: 'ltr | rtl',
  logoUrl: 'https://...',
  themeStylesUrl: 'https://...',
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
      title: titles[key] || key,
      placeholder: placeholders[key],
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
