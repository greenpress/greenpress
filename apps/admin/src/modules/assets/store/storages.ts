import { reactive } from 'vue'
import storagesService from '@/services/storages-service'
import { IStorage } from '@/services/types/storage'

export interface IStoragesStore {
  loaded: boolean,
  loading: boolean,
  storages: IStorage[]
}

export const storagesStore = reactive<IStoragesStore>({
  loaded: false,
  loading: false,
  storages: []
})

export async function fetchStorages() {
  if (storagesStore.loaded || storagesStore.loading) {
    return
  }
  storagesStore.loading = true
  storagesStore.loaded = false
  try {
    storagesStore.storages = await storagesService.getAll()
    storagesStore.loaded = true
  } catch (e) {
    storagesStore.loaded = false
  } finally {
    storagesStore.loading = false
  }
}

export async function addStorage(data) {
  const storage = await storagesService.create(data)
  storagesStore.storages.push(storage)
  return storage
}

export async function updateStorage(data) {
  const updatedStorage = await storagesService.update(data._id, data)
  storagesStore.storages = storagesStore.storages.map(storage => storage._id === data._id ? updatedStorage : storage)
  return updatedStorage
}

export async function removeStorage(id: string) {
  await storagesService.remove(id)
  storagesStore.storages = storagesStore.storages.filter(storage => storage._id !== id)
}
