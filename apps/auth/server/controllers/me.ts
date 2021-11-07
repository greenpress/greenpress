import {updateUser} from '../services/users'
import {Response} from 'express'
import {AuthRequest} from '../../types'

export function getMe(req: AuthRequest, res: Response) {
  res.status(200).json({
    _id: req.userPayload.sub,
    email: req.userPayload.email,
    name: req.userPayload.name,
    roles: req.userPayload.roles
  }).end();
}

export async function setMe(req: AuthRequest, res: Response) {
  const {email, password, name} = req.body || {}
  try {
    await updateUser(
      {_id: req.userPayload.sub, tenant: req.userPayload.tenant},
      {email, password, name}
    )
    res.status(200).json({
      _id: req.userPayload.sub,
      email: email || req.userPayload.email,
      name: name || req.userPayload.name,
      roles: req.userPayload.roles
    }).end()
  } catch (e) {
    res.status(500).json({message: 'failed to update your user information'}).end()
  }
}
