const mongoose = require('mongoose')

const TENANT = process.env.TENANT || '0'

const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')
const Configuration = mongoose.model('Configuration')
const Menu = mongoose.model('Menu')
const Category = mongoose.model('Category')

/**
 * add tenant="0" to all collections rows, to support basic tenant usage
 */


async function hasRowsWithoutTenant () {
  return (!!(
    await Post.collection.countDocuments({ tenant: { $exists: false } }) ||
    await Comment.collection.countDocuments({ tenant: { $exists: false } }) ||
    await Configuration.collection.countDocuments({ tenant: { $exists: false } }) ||
    await Menu.collection.countDocuments({ tenant: { $exists: false } }) ||
    await Category.collection.countDocuments({ tenant: { $exists: false } })
  ))
}

/**
 * check potential changes to migrate
 */
async function check () {
  return await hasRowsWithoutTenant()
}

/**
 * migrate relevant db rows to fit the new upgrade
 */
async function migrate () {
  console.log('start tenant migration for posts:')
  await Post.collection.update({ tenant: { $exists: false } }, { $set: { tenant: TENANT } }, { multi: true })

  console.log('start tenant migration for comments:')
  await Comment.collection.update({ tenant: { $exists: false } }, { $set: { tenant: TENANT } }, { multi: true })

  console.log('start tenant migration for configurations:')
  await Configuration.collection.update({ tenant: { $exists: false } }, { $set: { tenant: TENANT } }, { multi: true })

  console.log('start tenant migration for menus:')
  await Menu.collection.update({ tenant: { $exists: false } }, { $set: { tenant: TENANT } }, { multi: true })

  console.log('start tenant migration for categories:')
  await Category.collection.update({ tenant: { $exists: false } }, { $set: { tenant: TENANT } }, { multi: true })

  console.log('Done!\n' +
    'Do not forget to migrate the users separately.\n' +
    'Note that secrets will not able to be decrypted anymore.')
}

/**
 * check if all migration changes done as expected
 */
async function verify () {
  const foundRows = await hasRowsWithoutTenant()
  if (foundRows) {
    return Promise.reject('still have rows to update..  migration failed.')
  }
}

module.exports = {
  check, migrate, verify
}
