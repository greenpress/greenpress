const { getRouter } = require('@greenpress/api-kit/router')
const verifyUser = require('../middleware/verify-user')
const { getUsers, createUser, getUser, updateUser, removeUser } = require('../controllers/users')
const { onlyPrivileged } = require('../middleware/auth-check')

const router = getRouter();

router
  .get('/api/users', verifyUser, getUsers)
  .post('/api/users', verifyUser, onlyPrivileged, createUser)
  .get('/api/users/:userId', verifyUser, getUser)
  .put('/api/users/:userId', verifyUser, onlyPrivileged, updateUser)
  .delete('/api/users/:userId', verifyUser, onlyPrivileged, removeUser)

module.exports = router
