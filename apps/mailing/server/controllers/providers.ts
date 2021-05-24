import uniqid from 'uniqid'
import EmailProvider from '../models/email-provider'
import { setSecret } from '../../helpers/secrets-management'

export function createProvider(req, res) {
  const body = req.body || {}
  const provider = new EmailProvider({
    tenant: req.headers.tenant,
    name: body.name,
    kind: body.kind,
    metadata: body.metadata,
    access: body.access || { predefinedPublic: false },
    authentication: uniqid()
  })

  return setSecret(provider.tenant, provider.authentication, body.authentication)
    .then(() => provider.save())
    .then((provider) => {
      res.status(200).json({
        _id: provider._id,
        name: provider.name,
        kind: provider.kind,
        metadata: provider.metadata
      }).end()
    })
    .catch((err) => {
      res.status(500).json({ message: 'email provider creation failed' }).end()
    })
}

export function getProvidersList(req, res) {
  return EmailProvider.find({ tenant: req.headers.tenant })
    .select('kind name metadata')
    .lean()
    .then(list => {
      if (!list) {
        return Promise.reject(null)
      }
      res.status(200).json(list).end()
    })
    .catch(() => {
      res.status(500).json({ message: 'error loading email providers list' }).end()
    })
}

export function removeProvider(req, res) {
  req.provider.remove()
    .then(() => res.status(200).json({}).end())
    .catch(() => res.status(500).json({ message: 'failed to remove email provider' }).end())
}

export function updateProvider(req, res) {
  const body = req.body || {}
  let promise = Promise.resolve()
  if (body.name && body.name !== req.provider.name) {
    req.provider.name = body.name
  }
  if ((body.kind && body.kind !== req.provider.kind) || body.authentication) {
    req.provider.kind = body.kind || req.provider.kind
    promise = setSecret(req.provider.tenant, req.provider.authentication, body.authentication)
  }
  if (body.metadata) {
    req.provider.metadata = body.metadata
  }
  if (body.access) {
    req.provider.access = body.access
  }
  promise
    .then(() => req.provider.save())
    .then(() => res.status(200).json({
      name: req.provider.name,
      kind: req.provider.kind,
      metadata: req.provider.metadata
    }).end())
    .catch(() => res.status(500).json({ message: 'failed to update email provider' }).end())
}

export function getProviderById(req, res, next) {
  return EmailProvider.findOne({ _id: req.params.providerId, tenant: req.headers.tenant })
    .then(provider => {
      req.provider = provider
      next()
    })
    .catch(() => res.status(500).json({ message: 'could not find email provider' }).end())
}

export function getProvider(req, res) {
  const { _id, name, kind, metadata } = req.provider
  res.status(200).json({ _id, name, kind, metadata }).end()
}
