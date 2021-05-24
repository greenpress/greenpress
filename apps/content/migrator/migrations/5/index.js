const mongoose = require('mongoose')
const Post = mongoose.model('Post')

async function hasRowsWithoutPinned () {
	return (!!(
	  await Post.collection.countDocuments({ isPinned: { $exists: false } })
	))
}

async function check () {
	return await hasRowsWithoutPinned()
}

async function migrate () {
	console.log('start pinned migration for posts:')
	await Post.collection.update({ isPinned: { $exists: false } }, { $set: { isPinned: false } }, { multi: true })

	console.log('Done!');
}

async function verify () {
	const foundRows = await hasRowsWithoutPinned()
	if (foundRows) {
		return Promise.reject('still have rows to update..  migration failed.')
	}
}

module.exports = {
	check, migrate, verify
}
