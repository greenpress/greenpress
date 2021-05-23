const { updateUser } = require('../services/users')

function getMe(req, res) {
	return res.status(200).json({
		_id: req.userPayload.sub,
		email: req.userPayload.email,
		name: req.userPayload.name,
		roles: req.userPayload.roles
	}).end()
}

async function setMe(req, res) {
	const { email, password, name } = req.body || {}
	try {
		await updateUser(req.userPayload, { email, password, name })
		res.status(200).json({
			_id: req.userPayload.sub,
			email: email || req.userPayload.email,
			name: name || req.userPayload.name,
			roles: req.userPayload.roles
		}).end()
	} catch (e) {
		res.status(500).json({ message: 'failed to update your user information' }).end()
	}
}

module.exports = {
	getMe,
	setMe
}
