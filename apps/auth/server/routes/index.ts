const app = require('@greenpress/api-kit').app();
import me from '../controllers/me';
import { onlyAuthenticated } from '../middleware/auth-check';
import verifyUser from '../middleware/verify-user';

app.use(require('cookie-parser')());

app
  .route('/api/me', verifyUser, onlyAuthenticated)
  .post(me.setMe)
  .get(me.getMe);

app.use(require('./users'));
app.use(require('./auth'));
