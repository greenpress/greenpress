import { populateUser, verifyUser } from '@greenpress/api-kit/dist/user-middlewares'
import {
	deleteDraft,
	getDraft,
	getDraftsList,
	setDraft
} from '../controllers/drafts'

export default (app) => {
	app.use(populateUser)
	app.use(verifyUser)

	app
		.get('/api/drafts/all', getDraftsList)
		.get('/api/drafts', getDraft)
		.put('/api/drafts', setDraft)
		.delete('/api/drafts', deleteDraft)
};
