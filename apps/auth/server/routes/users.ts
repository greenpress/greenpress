import users from '../controllers/users'
import { Router } from 'express'
import verifyUser from '../middleware/verify-user'
import { onlyPrivileged } from '../middleware/auth-check'

const { getUsers, createUser, getUser, updateUser, removeUser } = users
const router = Router()

router
  .get('/api/users', verifyUser, getUsers)
  .post('/api/users', verifyUser, onlyPrivileged, createUser)
  .get('/api/users/:userId', verifyUser, getUser)
  .put('/api/users/:userId', verifyUser, onlyPrivileged, updateUser)
  .delete('/api/users/:userId', verifyUser, onlyPrivileged, removeUser)

module.exports = router
