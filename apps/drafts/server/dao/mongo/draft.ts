import Draft  from './models/draft'
import { GetDraftQuery } from '../types/get-draft-query'
import { SetDraftContexts } from '../types/set-draft-contexts'

export function getAll(tenant: string, user: string) {
	return Draft.find({ user, tenant }).lean().exec()
}

export function getDraft(query: GetDraftQuery) {
	return Draft.findOne(query).lean().exec()
}

export function setDraft(query: GetDraftQuery, contexts: SetDraftContexts) {
	return Draft.findOneAndUpdate(query, contexts, {
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	}).lean().exec()
}

export function removeDraft(query: GetDraftQuery) {
	return Draft.deleteOne(query).exec()
}
