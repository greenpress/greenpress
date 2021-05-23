const { defaultAuthType } = require('../../config')
const { getUser, comparePassword, setToken } = require('../services/users')
const PassportLocalStrategy = require('passport-local').Strategy

module.exports = new PassportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, email, password, done) => {
	const query = { email: email.trim(), tenant: req.headers.tenant }
	const authType = req.body.authType || defaultAuthType

	if (req.body.roles && req.body.roles instanceof Array) {
		query.roles = { $in: req.body.roles }
	}
	getUser(query)
		.then(user => comparePassword(user, password))
		.then((user) => setToken(user, authType))
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
