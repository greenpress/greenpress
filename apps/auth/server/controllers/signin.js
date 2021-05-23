const passport = require('passport')
const { validateSignInForm, tokenPayload } = require('./signin-signup-token');

function signin (req, res, next) {
	const validationErrors = validateSignInForm(req.body)

	if (Object.keys(validationErrors).length > 0) {
		return res.status(401).json({ errors: validationErrors })
	}

	return passport.authenticate('local-login', (error, data) => {
		if (error !== null) {
			return res.status(401).json({
				errors: {
					[error.code === 'INCORRECT_CREDENTIALS' ? 'password' : '']: error
				}
			})
		}
		if (!data) {
			return res.status(401).json({
				errors: {
					'password': 'password is incorrect'
				}
			})
		}

		tokenPayload(res, data);


	})(req, res, next)
}

module.exports = signin
