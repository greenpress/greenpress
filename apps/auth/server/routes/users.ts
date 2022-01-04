import {getRouter} from '@greenpress/api-kit/src/router'
import users from '../controllers/users'
import verifyUser from '../middleware/verify-user'
import {onlyPrivileged} from '../middleware/auth-check'
import {AuthRequest} from '../../types';

const {getUsers, createUser, getUser, updateUser, removeUser} = users
const router: any = getRouter()

router
  .get('/api/users', verifyUser, getUsers)
  .post('/api/users', verifyUser, onlyPrivileged,
    (req: AuthRequest, res) => {
      createUser(req, res);
    })
  .get('/api/users/:userId', verifyUser, getUser)
  .put('/api/users/:userId', verifyUser, onlyPrivileged,
    (req: AuthRequest, res) => {
      updateUser(req, res);
    })
  .delete('/api/users/:userId', verifyUser, onlyPrivileged,
    (req: AuthRequest, res) => {
      removeUser(req, res)
    });

export default router;
