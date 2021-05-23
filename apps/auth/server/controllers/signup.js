const passport = require('passport')
const { validateSignUpForm, tokenPayload } = require('./signin-signup-token');

function signup (req, res, next) {
  const validationErrors = validateSignUpForm(req.body)

  if (Object.keys(validationErrors).length > 0) {
    return res.json({ errors: validationErrors })
  }

  return passport.authenticate('local-signup', (err, data) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        return res.json({
          errors: {
            email: 'DUPLICATED_EMAIL'
          }
        })
      }

      return res.json({
        errors: {
          '': 'FORM_SUBMISSION_FAILED'
        }
      })
    }

    tokenPayload(res, data);

  })(req, res, next)
}

module.exports = signup
