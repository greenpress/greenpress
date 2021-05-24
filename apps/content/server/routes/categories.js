module.exports = function (app) {
  const populateUser = require('../middleware/populate-user')
  const { onlyEditor } = require('../middleware/auth-check')

  const {
    getCategoriesList, createCategory, getCategoryByPath, getCategory,
    updateCategory,
    removeCategory,
  } = require('../controllers/categories')

  // categories routes
  app
    .get('/api/categories', populateUser, getCategoriesList)
    .post('/api/categories', populateUser, onlyEditor, createCategory)
    .get('/api/categories/:categoryPath', getCategoryByPath, getCategory)
    .put('/api/categories/:categoryPath', populateUser, onlyEditor, getCategoryByPath, updateCategory)
    .delete('/api/categories/:categoryPath', populateUser, onlyEditor, getCategoryByPath, removeCategory)

}
