import validator from 'validator';

export function validateBasicSignInSignUpForm(payload: {email:string}) {
	const errors:Record<string, any> = {};
	if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email.trim())) {
		errors.email = {
			code: 'INVALID_EMAIL'
		};
	}

	return errors;
}
