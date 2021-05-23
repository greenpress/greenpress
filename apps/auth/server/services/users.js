const User = require('../models/user')
const { cookieTokenExpiration } = require('../../config')

async function getUser(query) {
	try {
		const user = await User.findOne(query)
		if (user) {
			return user
		}
	} catch (err) {
		throw { code: 'FORM_SUBMISSION_FAILED', info: err }
	}

	throw { code: 'INCORRECT_CREDENTIALS' }
}

function updateUser(user, { email = null, password = null, name = null, roles = null }) {
	let directUpdate
	if (!(user instanceof User)) {
		directUpdate = { _id: user._id, tenant: user.tenant }
		user = {}
	}
	if (email) {
		user.email = email
	}

	if (password) {
		user.password = password
	}

	if (name) {
		user.name = name
	}

	if (roles) {
		user.roles = roles
	}

	return (
		directUpdate ?
			User.updateOne(directUpdate, { $set: user }) :
			user.save()
	)
		.catch(err => Promise.reject({ code: 'UPDATE_USER_FAILED', info: err }))
}

function deleteUser(userId, tenant) {
	User.deleteOne({ _id: userId, tenant })
		.then((() => Promise.resolve({ code: 'USER_DELETED_SUCCESSFULLY', info: userId })))
		.catch((error) => Promise.reject({ code: 'USER_DELETE_FAILED', info: error }))
}

function comparePassword(user, password) {
	return new Promise((resolve, reject) => {
		return user.comparePassword(password.trim(), (passwordErr, isMatch) => {
			if (passwordErr) {
				return reject({ code: 'FORM_SUBMISSION_FAILED', info: passwordErr })
			}
			if (!isMatch) {
				return reject({ code: 'INCORRECT_CREDENTIAL' })
			}
			resolve(user)
		})
	})
}

function setToken(user, authType) {
	if (authType === 'oauth') {
		return setOAuthAuthentication(user, authType)
	}
	if (authType === 'cookie') {
		return setCookieAuthentication(user)
	}
	throw { code: 'INVALID_AUTH_TYPE' }
}

function updateToken(user, authType, currentToken, newToken) {
	return user.updateToken(authType, currentToken, newToken)
		.catch(err => Promise.reject({ code: 'UPDATE_TOKEN_FAILED', info: err }))
}

async function deleteToken(tenant, userId, authType, token, isRelatedToken) {
	try {
		const user = await User.findOne({ _id: userId, tenant })
		if (isRelatedToken) {
			token = await user.getTokenByRelatedTokens(authType, token)
		}
		user?.deleteToken(authType, token)
	} catch (e) {
		return false
	}

	return true
}

function setOAuthAuthentication(user) {
	const token = user.getToken('oauth')
	const refreshToken = user.getRefreshToken(token)

	return user.save().then(() => {
		return {
			token,
			refreshToken,
			user
		}
	})
}

function setCookieAuthentication(user) {
	const cookieToken = user.getToken('cookie', cookieTokenExpiration / 1000)

	return user.save().then(() => {
		return { user, cookieToken }
	})
}

function getUserIfTokenExists(tenant, userId, tokenId) {
	return User.findOne({ _id: userId, tenant, 'tokens.tokenIdentifier': tokenId })
		.then(user => user || Promise.reject())
		.catch(() => Promise.reject({ code: 'USER_WITH_TOKEN_NOT_EXISTS' }))
}

module.exports = {
	getUser,
	updateUser,
	deleteUser,
	comparePassword,
	setToken,
	updateToken,
	deleteToken,
	getUserIfTokenExists
}
