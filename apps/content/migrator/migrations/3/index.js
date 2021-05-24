const mongoose = require('mongoose')

const Post = mongoose.model('Post')

/**
 * change post.content to array of contents, with editorContentsStates as array of 'editor' enum by default
 */

/**
 * check potential changes to migrate
 */
async function check () {
  const hasOldSchemaPosts = await Post.collection.countDocuments({ content: { $exists: true } })
  return !!hasOldSchemaPosts
}

/**
 * migrate relevant db rows to fit the new upgrade
 */
function migrate () {
  console.log('start post.content migration')
  return Post.aggregate([
    { $match: { content: { $exists: true } } },
    { $limit: 20 },
    { $project: { content: 1, _id: 1 } }
  ])
    .then(async (list) => {
      if (!list || !list.length) {
        console.log('No more rows to update.')
        return true
      }

      let row
      console.log('start migration of ' + list.length + ' items')
      for (let i in list) {
        row = list[i]
        console.log('update post: ', row._id)
        await Post.collection.updateOne({ _id: row._id },
          {
            $unset: { content: '' },
            $set: { contents: [row.content], editorContentsStates: ['editor'] }
          })
      }
      return migrate()
    })
}

/**
 * check if all migration changes done as expected
 */
function verify () {
  return Post.collection.countDocuments({ content: { $exists: true } })
    .then(count => {
      if (count) return Promise.reject('still have rows to update..  migration failed.')
    })
}

module.exports = {
  check, migrate, verify
}
