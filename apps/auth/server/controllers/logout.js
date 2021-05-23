const { deleteToken } = require('../services/users')
const { setCookie } = require('../services/tokens')

function removeToken (tenant, userId, authType, token) {
	deleteToken(tenant, userId , authType, token, (authType === 'oauth'))
		.catch(Promise.resolve)
}

async function logout (req, res) {
	const tenant = req.headers.tenant = req.headers.tenant || '0'
	const userId = req.userPayload.sub

	let token, authType
	if (req.cookies.token || req.signedCookies.token) {
		token = req.cookies.token || req.signedCookies.token
		authType = 'cookie'
		setCookie(res, '', -1)
	} else {
		token = req.headers.authorization?.split(' ')[1] ?? ''
		authType = 'oauth'
	}
	removeToken(tenant, userId, authType, token)
	res.status(200).end()
}

module.exports = logout
