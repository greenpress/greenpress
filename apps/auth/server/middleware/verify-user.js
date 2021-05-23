const { verifyToken, getUniqueId, setCookie, getSignedToken } = require('../services/tokens')
const { getUserIfTokenExists, updateToken } = require('../services/users')
const { privilegedRoles, cookieTokenExpiration, cookieTokenVerificationTime } = require('../../config')


function oAuthVerify (req, res, next) {
	// get the last part from a authorization header string like "bearer token-value"
	const token = req.headers.authorization.split(' ')[1]
	const tenant = req.headers.tenant = req.headers.tenant || '0'

	return verifyToken(token, tenant)
		.then(payload => setUserPayload(payload, req, next))
		.catch(() => {
			return next()
		})
}

async function cookieVerify (req, res, next) {
	// get the last part from a authorization header string like "bearer token-value"
	const token = req.signedCookies.token || req.cookies.token
	const tenant = req.headers.tenant = req.headers.tenant || '0'

	try {
		const payload = await verifyToken(token, tenant)
		const created = Number(payload.tokenIdentifier?.split(':')[0])
		if (Date.now() - created < cookieTokenVerificationTime) {
			setUserPayload(payload, req, next)
			return
		}
		const newCookieIdentifier = getUniqueId()
		const user = await getUserIfTokenExists(payload.tenant, payload.sub, payload.tokenIdentifier)
		await updateToken(user, 'cookie', payload.tokenIdentifier, newCookieIdentifier)
		const { token: newToken, payload: newPayload } = getSignedToken(user, newCookieIdentifier, cookieTokenExpiration / 1000)

		setCookie(res, newToken)
		setUserPayload(newPayload, req, next)
	} catch (e) {
		next()
	}
}

function setUserPayload (payload, req, next) {
	req.userPayload = payload
	req.userPayload.isPrivileged = payload.roles.some(role => privilegedRoles.includes(role))
	next()
}

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
	if (req.cookies.token || req.signedCookies.token) {
		return cookieVerify(req, res, next)
	} else if (req.headers.authorization) {
		return oAuthVerify(req, res, next)
	}
	return next()
}
