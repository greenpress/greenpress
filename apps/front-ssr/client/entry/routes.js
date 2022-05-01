import { getRoutes, hydrateRoutes } from './core'

export default import.meta.env.SSR
  ? () => getRoutes(import.meta.globEager('../views/*.vue'))
  : () => hydrateRoutes(import.meta.glob('../views/*.vue'))
