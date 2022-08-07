import {Response, Request, RequestHandler} from 'express'
import {AuthRequest} from '../../types'
import User, {IUser} from '../models/user'
import UserInternalMetadata from '../models/user-internal-metadata';

const {Types: {ObjectId}} = require('mongoose')
const UsersService = require('../services/users')
const {isObjectId} = require('../../helpers/mongo-utils')

const privilegedUserFields = 'email fullName firstName lastName birthDate roles'

function getUsers(req: AuthRequest, res: Response): RequestHandler {
  const isPrivileged = !!(req.userPayload && req.userPayload.isPrivileged)

  const users = (req.query.users as string || '')
    .split(',')
    .map(id => {
      const val = id.trim()
      if (isObjectId(val)) {
        return ObjectId(val)
      }
      return false
    })
    .filter(Boolean)

  if (!(isPrivileged || users.length)) {
    res.status(200).json([]).end()
    return;
  }

  User
    .getUsersList(req.headers.tenant, users, isPrivileged, privilegedUserFields)
    .then(list => {
      res.status(200).set('Content-Type', 'application/json').end(list)
    })
    .catch(() => res.status(404).json({message: 'could not load users'}).end())
}

function getUser(req: AuthRequest, res: Response): RequestHandler {
  const isPrivileged = !!(req.userPayload && req.userPayload.isPrivileged)

  const promises: Array<Promise<any>> = [
    User.findOne({_id: req.params.userId, tenant: req.headers.tenant})
      .select(isPrivileged ? privilegedUserFields : 'fullName')
      .lean().exec()
  ]
  if (isPrivileged) {
    promises.push(UserInternalMetadata.findOne({_id: req.params.userId, tenant: req.headers.tenant}).lean().exec())
  }

  Promise.all(promises)
    .then(([user, internalMetadata]) => {
      if (!user) {
        return Promise.reject(null)
      }
      if (isPrivileged) {
        user.internalMetadata = internalMetadata?.metadata || {};
      }
      res.status(200).json(user).end()
    })
    .catch(() => res.status(404).json({message: 'user not exists'}).end())
  return;
}

async function createUser(req: AuthRequest, res: Response) {
  const {tenant, name, internalMetadata, ...userData} = req.body
  const user = new User(userData);
  user.tenant = req.headers.tenant;
  if (!user.fullName && name) {
    user.fullName = name;
  }
  try {
    const {_id, fullName, firstName, lastName, birthDate, email, roles} = await user.save()
    const userInternalMetadata = new UserInternalMetadata({
      tenant: req.headers.tenant,
      user: _id,
      metadata: internalMetadata || {}
    });
    await userInternalMetadata.save();

    res.status(200).json({_id, name: fullName, firstName, lastName, birthDate, email, roles, internalMetadata}).end()
  } catch (e) {
    res.status(400).json({message: 'user creation failed'}).end()
  }
}

async function updateUser(req: AuthRequest, res: Response) {
  const {email, roles, name, password, fullName, firstName, lastName, birthDate, internalMetadata} = req.body || {}

  try {
    await UsersService.updateUser(
      {_id: req.params.userId, tenant: req.headers.tenant},
      {email, roles, password, fullName: fullName || name, firstName, lastName, birthDate}
    )
    if (internalMetadata) {
      const userInternalMetadata = (await UserInternalMetadata.findOne({
        user: req.params.userId,
        tenant: req.headers.tenant
      }) || new UserInternalMetadata({
        user: req.params.userId,
        tenant: req.headers.tenant
      }))
      userInternalMetadata.metadata = Object.assign(userInternalMetadata.metadata || {}, internalMetadata);
      userInternalMetadata.save();
    }
    res.status(200).json({
      email,
      name: fullName || name,
      fullName: fullName || name,
      firstName,
      lastName,
      birthDate,
      roles,
      _id: req.params.userId
    }).end()
  } catch (e) {
    res.status(400).json({message: 'user update failed'}).end()
  }
}

async function removeUser(req: Request, res: Response) {
  try {
    await UsersService.deleteUser(req.params.userId, req.headers.tenant);
    res.status(200).json({_id: req.params.userId}).end()
  } catch (e) {
    res.status(400).json({message: 'user deletion failed'}).end()
  }
}

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
}
