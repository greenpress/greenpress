const validator = require('validator');

function validateBasicSignInSignUpForm(payload) {
	const errors = {};
	if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email.trim())) {
		errors.email = {
			code: 'INVALID_EMAIL'
		};
	}

	return errors;
}

module.exports = {
	validateBasicSignInSignUpForm
};
