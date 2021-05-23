import { api, getCallData } from './api'
import { Draft } from './types/draft'

export function getAll<T = any>(): Promise<Draft<T>[]> {
  return api.get('/api/drafts/all').then(getCallData)
}

export function getDraft<T = any>(contextType: string, contextId: string|null): Promise<Draft<T>> {
  return api.get('/api/drafts', { params: { contextType, contextId } }).then(getCallData)
}

export function setDraft<T = any>(draftData: any): Promise<Draft<T>> {
  return api.put('/api/drafts', draftData).then(getCallData)
}

export function deleteDraft<T = any>(contextType: string, contextId: string|null): Promise<Draft<T>> {
  return api.delete('/api/drafts', { params: { contextType, contextId } })
}
