export interface IDraftContexts<T> {
  contextType: string,
  contextId: string | null,
  contextData: T,
  contextDisplayName: string,
  contextRouteParams: any
}

export interface Draft<T> extends IDraftContexts<T> {
  _id: string,
  user: string,
  tenant: string,
}
