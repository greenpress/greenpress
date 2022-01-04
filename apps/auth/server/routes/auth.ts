import {getRouter} from '@greenpress/api-kit/src/router'
import {onlyAuthenticated} from '../middleware/auth-check';
import verifyUser from '../middleware/verify-user';
import {signin} from '../controllers/signin';
import {signup} from '../controllers/signup';
import {refreshToken} from '../controllers/refresh-token';
import {logout} from '../controllers/logout';

const router: any = getRouter()

router
  .post('/api/signin', signin)
  .post('/api/signup', signup)
  .post('/api/token/refresh', refreshToken)
  .post('/api/logout', verifyUser, onlyAuthenticated, logout);

export default router;
