import { Response, Request, RequestHandler } from "express"
import { AuthRequest } from "../../types"
import User, {IUser} from '../models/user'

const { Types: { ObjectId } } = require('mongoose')
const UsersService = require('../services/users')
const { isObjectId } = require('../../helpers/mongo-utils')

const privilegedUserFields = 'email name roles'

function getUsers(req:AuthRequest, res:Response): RequestHandler {
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
	}

	const query: Record<string, any> = isPrivileged && !users.length ? {} : { _id: { $in: users } }
	query.tenant = req.headers.tenant

	User.find(query)
		.select(isPrivileged ? privilegedUserFields : 'name')
		.lean()
		.then((users:any[]) => {
			res.status(200).json(users || []).end()
		})
		.catch(() => res.status(404).json({ message: 'could not load users' }).end())
  return;
}

function getUser(req:AuthRequest, res:Response): RequestHandler {
	const isPrivileged = !!(req.userPayload && req.userPayload.isPrivileged)

	User.findOne({ _id: req.params.userId, tenant: req.headers.tenant })
		.select(isPrivileged ? privilegedUserFields : 'name')
		.lean()
		.then((user?: IUser) => {
			if (!user) {
				return Promise.reject(null)
			}
			res.status(200).json(user).end()
		})
		.catch(() => res.status(404).json({ message: 'user not exists' }).end())
  return;
}

async function createUser(req:AuthRequest, res:Response) {
	const user = new User(req.body)
	user.tenant = req.headers.tenant

	try {
		const { _id, name, email, roles } = await user.save()
		res.status(200).json({ _id, name, email, roles }).end()
	} catch (e) {
		res.status(400).json({ message: 'user creation failed' }).end()
	}
}

async function updateUser(req:AuthRequest, res:Response) {
	const { email, roles, name, password } = req.body || {}

	try {
		await UsersService.updateUser(
			{ _id: req.params.userId, tenant: req.headers.tenant },
			{ email, roles, name, password }
		)
		res.status(200).json({ email, name, roles, _id: req.params.userId }).end()
	} catch (e) {
		res.status(400).json({ message: 'user update failed' }).end()
	}
}

async function removeUser(req:Request, res:Response) {
	try {
		await UsersService.deleteUser(req.params.userId, req.headers.tenant);
		res.status(200).json({ _id: req.params.userId }).end()
	} catch (e) {
		res.status(400).json({ message: 'user deletion failed' }).end()
	}
}

export default {
	getUsers,
	createUser,
	getUser,
	updateUser,
	removeUser,
}
