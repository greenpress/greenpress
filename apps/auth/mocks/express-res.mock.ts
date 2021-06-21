

export function getExpressResMock(): ExpressResMock {
  const resMock = jest.fn()

  ;(resMock as any).status = jest.fn(() => resMock)
  ;(resMock as any).json = jest.fn(() => resMock)
  ;(resMock as any).end = jest.fn(() => resMock)

  return resMock as ExpressResMock
}

export interface ExpressResMock extends jest.Mock {
  status: () => jest.Mock
  json: () => jest.Mock
  end: () => jest.Mock
}