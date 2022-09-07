import {getRouter} from '@greenpress/api-kit'
import users from '../controllers/users'
import verifyUser from '../middleware/verify-user'
import {onlyPrivileged} from '../middleware/auth-check'

const {getUsersForAdmin, getUsers, createUser, getUser, updateUser, removeUser, getUserEncryptedData, setUserEncryptedData} = users
const router = getRouter()

router
  .get('/api/users', verifyUser, getUsers)
  .post('/api/users', verifyUser, onlyPrivileged, createUser)
  .post('/api/users/:userId/encrypted', verifyUser, onlyPrivileged, setUserEncryptedData)
  .get('/api/users/:userId', verifyUser, getUser)
  .get('/api/users/:userId/encrypted', verifyUser, onlyPrivileged, getUserEncryptedData)
  .put('/api/users/:userId', verifyUser, onlyPrivileged, updateUser)
  .delete('/api/users/:userId', verifyUser, onlyPrivileged, removeUser);

router
  .get('/internal-api/users', getUsersForAdmin)
  .post('/internal-api/users', createUser)
  .delete('/internal-api/users/:userId', removeUser);


export default router;
