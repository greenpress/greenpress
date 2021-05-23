const app = require('@greenpress/api-kit').app()
const {verifyUser, populateUser} = require('@greenpress/api-kit/user-middlewares')

const editorCheck = require('../middleware/editor-check')

app.use(populateUser, verifyUser, editorCheck);
require('./assets')
require('./storage')
