const { editorsRoles, adminRole } = require('../../config')
const { populateUser } = require('@greenpress/api-kit')

/**
 *  Populate user on request
 */
module.exports = (req, res, next) => {
	populateUser(req, res, () => {
		if (req.user) {
			const user = req.user
			user.isEditor = user.roles.some(role => editorsRoles.includes(role))
			user.isAdmin = user.roles.includes(adminRole)
		}
		next()
	})
}
