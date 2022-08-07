import {updateUser} from '../services/users'
import {Response} from 'express'
import {AuthRequest} from '../../types'

export function getMe(req: AuthRequest, res: Response) {
  const fullName = req.userPayload.fullName || req.userPayload.name;
  res.status(200).json({
    _id: req.userPayload.sub,
    email: req.userPayload.email,
    name: fullName,
    fullName,
    roles: req.userPayload.roles
  }).end();
}

export async function setMe(req: AuthRequest, res: Response) {
  const {email, password, name, fullName, firstName, lastName, birthDate} = req.body || {}
  try {
    await updateUser(
      {_id: req.userPayload.sub, tenant: req.userPayload.tenant},
      {email, password, fullName: fullName || name, firstName, lastName, birthDate}
    )
    res.status(200).json({
      _id: req.userPayload.sub,
      email: email || req.userPayload.email,
      name: name || req.userPayload.name,
      fullName: fullName || req.userPayload.fullName,
      firstName: firstName || req.userPayload.firstName,
      lastName: lastName || req.userPayload.lastName,
      birthDate: birthDate || req.userPayload.birthDate,
      roles: req.userPayload.roles
    }).end()
  } catch (e) {
    res.status(500).json({message: 'failed to update your user information'}).end()
  }
}
