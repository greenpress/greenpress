import { mongoUri } from '../../config'
import { GetDraftQuery } from './types/get-draft-query'
import { SetDraftContexts } from './types/set-draft-contexts'

class DraftDao {
	private model

	constructor() {
		if (mongoUri) {
			require('./mongo/connect')(mongoUri)
			this.model = require('./mongo/draft')
		}
	}

	getAll(tenant: string, user: string) {
		return this.model.getAll(tenant, user)
	}

	getDraft(query: GetDraftQuery) {
		return this.model.getDraft(query)
	}

	setDraft(query: GetDraftQuery, contexts: SetDraftContexts) {
		return this.model.setDraft(query, contexts)
	}

	removeDraft(query: GetDraftQuery) {
		return this.model.removeDraft(query)
	}
}

const draftDao = new DraftDao
export default draftDao
