const { validateBasicSignInSignUpForm } = require('../../helpers/form-validations')
const { setCookie } = require('../services/tokens')

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignUpForm (payload) {
    const errors = validateBasicSignInSignUpForm(payload)

    if (!payload || (typeof payload.name !== 'string') || !/^[a-zA-Z]+([\-\s]?[a-zA-Z]+)*$/.test(payload.name.trim())) {
        errors.name = {
            code: 'INVALID_NAME'
        }
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        errors.password = {
            code: 'INVALID_PASSWORD'
        }
    }

    return errors
}


/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignInForm (payload) {
    const errors = validateBasicSignInSignUpForm(payload)

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        errors.password = {
            code: 'EMPTY_PASSWORD'
        }
    }

    return errors
}

function tokenPayload(res, data) {
    const { token, refreshToken, cookieToken, user } = data

    if (cookieToken) {
        res = setCookie(res, cookieToken)
        return res.status(200).json({
            payload: { user }
        }).end()
    } else {
        return res.status(200).json({
            payload: {
                token,
                refreshToken,
                user
            }
        }).end()
    }
}


module.exports = {
    validateSignInForm,
    validateSignUpForm,
    tokenPayload
}
