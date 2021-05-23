/**
 * this file used to initiate basic data inside the authentication service
 */
const config = require('../config');
require('../server/models').connect(config.mongoUri);
const User = require('mongoose').model('User');
const { reset, init } = require('./init-util.js')

reset()
	.then(init)
	.then(() => {
		console.log('reset successfully');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
