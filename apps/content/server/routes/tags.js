module.exports = function (app) {
  const {
    getTagsList,
    getPostsByTag
  } = require('../controllers/tags')

  // menus routes
  app
    .get('/api/tags', getTagsList)
    .get('/api/tags/:tag', getPostsByTag)
}
