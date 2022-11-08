const isProduction = process.env.NODE_ENV !== 'development'

const httpAgent = isProduction ?
  new (require('https').Agent)({
    rejectUnauthorized: false,
  })
  : undefined

export default httpAgent;