import { app as getApp } from '@greenpress/api-kit'
import { populateUser } from '@greenpress/api-kit/user-middlewares'

const app = getApp()
app.use(populateUser)
