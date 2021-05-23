const app = require('@greenpress/api-kit').app()

const verifyUser = require('../middleware/verify-user')
const { onlyAuthenticated } = require('../middleware/auth-check')
const me = require('./me');

app.use(require('cookie-parser')());

app
	.post('/api/signin', require('../controllers/signin'))
	.post('/api/signup', require('../controllers/signup'))
	.post('/api/token/refresh', require('./refresh-token'))
	.post('/api/logout', verifyUser, onlyAuthenticated, require('../controllers/logout'))
	.get('/api/me', verifyUser, onlyAuthenticated, me.getMe)
	.post('/api/me', verifyUser, onlyAuthenticated, me.setMe)

app.use(require('./users'))
