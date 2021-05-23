const User = require('../models/user')
const { setToken } = require('../services/users')
const { defaultAuthType, defaultRole } = require('../../config')
const PassportLocalStrategy = require('passport-local').Strategy

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, email, password, done) => {
	const name = (req.body && req.body.name) || ''
	const newUser = new User({
		tenant: req.headers.tenant,
		email: email.trim(),
		password: password.trim(),
		name,
		roles: [defaultRole]
	})
	const authType = req.body.authType || defaultAuthType

	setToken(newUser, authType)
		.then(({ user, token, refreshToken, cookieToken }) => {
			done(
				null,
				{
					token,
					refreshToken,
					cookieToken,
					user: {
						email: user.email,
						name: user.name,
						roles: user.roles
					}
				}
			)
		})
		.catch(done)
})
