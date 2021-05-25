import draftDao from '../dao/drafts'

export async function getDraftsList(req, res) {
	try {
		const drafts = await draftDao.getAll(req.headers.tenant, req.user._id)
		if (!drafts) throw new Error()
		res.status(200).json(drafts).end()
	} catch (err) {
		res.status(500).json({ message: 'error while finding drafts' }).end()
	}
}

export async function getDraft(req, res) {
	try {
		const { contextType, contextId } = req.query
		const draft = await draftDao.getDraft({
			user: req.user._id,
			tenant: req.headers.tenant,
			contextId: contextId || null,
			contextType
		})
		if (!draft) throw new Error()
		res.status(200).json(draft).end()
	} catch (err) {
		res.status(404).json({ message: 'draft not found' }).end()
	}
}

/**
 * for both creating and updating a draft, just like a Map data type
 * the frontend doesn't care if the draft exists or not, it just passes the contextData.
 */
export async function setDraft(req, res) {
	try {
		const user = req.user._id
		const { tenant } = req.headers
		const { contextType, contextId = null, contextData = {}, contextDisplayName = '', contextRouteParams = {} } = req.body

		const draft = await draftDao.setDraft({
			user,
			tenant,
			contextType,
			contextId
		}, { contextData, contextDisplayName, contextRouteParams })

		res.status(200).json(draft).end()
	} catch (err) {
		res.status(500).json({ message: 'error mutating draft' }).end()
	}
}

export async function deleteDraft(req, res) {
	try {
		const { contextType, contextId = null } = req.query
		const { tenant } = req.headers
		await draftDao.removeDraft({ contextType, contextId, tenant, user: req.user._id })
		res.status(200).json({ success: true }).end()
	} catch (err) {
		res.status(500).json({ message: 'couldn\'t delete draft' })
	}
}
