import {getRouter} from '@greenpress/api-kit/router'
import { onlyAuthenticated } from '../middleware/auth-check';
import verifyUser from '../middleware/verify-user';

const router = getRouter()

router
  .post('/api/signin', require('../controllers/signin'))
  .post('/api/signup', require('../controllers/signup'))
  .post('/api/token/refresh', require('../controllers/refresh-token'))
  .post(
    '/api/logout',
    verifyUser,
    onlyAuthenticated,
    require('../controllers/logout')
  );

module.exports = router;
