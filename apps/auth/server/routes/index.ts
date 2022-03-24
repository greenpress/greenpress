const app = require('@greenpress/api-kit').app();
import { getMe, setMe } from '../controllers/me';
import { onlyAuthenticated } from '../middleware/auth-check';
import verifyUser from '../middleware/verify-user';
import usersRouter from './users';
import authRouter from './auth';

app.use(require('cookie-parser')());

app
  .get('/api/me', verifyUser, onlyAuthenticated, getMe)
  .post('/api/me', verifyUser, onlyAuthenticated, setMe);

app.use(usersRouter);
app.use(authRouter);
