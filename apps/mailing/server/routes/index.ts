import { app as getApp } from '@greenpress/api-kit'
import { populateUser, verifyUser } from '@greenpress/api-kit/user-middlewares'
import editorCheck from '../middleware/editor-check'
import providersRoutes from './providers'

const app = getApp()
app.use(populateUser, verifyUser, editorCheck)
providersRoutes(app)
