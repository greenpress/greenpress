import { api, getCallData } from '@/services/api'
import { computed, Ref, ref } from 'vue'

export function getAssetInStorage(storageId: string, identifier?: string) {
  return api.get('/api/assets/' + storageId, {
    params: { identifier }
  }).then(getCallData)
}

export function useAssetsUpload(storageId: string, location: Ref<string>) {
  const uploadUrl = ref('')
  return {
    headers: computed(() => api.defaults.headers.common),
    withCredentials: computed(() => api.defaults.withCredentials),
    setUploadUrl(file) {
      const fileName = file.name.split('.')
      const url = new URL(`/api/assets/${storageId}`, api.defaults.baseURL)
      const locationPath =
        location.value + (location.value.endsWith('/') ? '' : '/')
      url.searchParams.append('identifier', locationPath)
      url.searchParams.append('prefix', fileName[0].replace(/ /g, ''))
      url.searchParams.append('extension', fileName[fileName.length - 1])

      uploadUrl.value = url.toString()
    },
    uploadUrl
  }
}

export function uploadAssetToStorage(storageId: string, identifier: string = '/', file: File) {
  return api.post('/api/assets/' + storageId, file, {
    params: { identifier }
  }).then(getCallData)
}

export function removeAssetFromStorage(storageId: string, identifier: string) {
  return api.delete('/api/assets/' + storageId, {
    params: { identifier }
  }).then(getCallData)
}

export function updateAssetFromStorage(storageId: string, identifier: string, metadata = {}) {
  return api.put('/api/assets/' + storageId, metadata, {
    params: { identifier }
  }).then(getCallData)
}
