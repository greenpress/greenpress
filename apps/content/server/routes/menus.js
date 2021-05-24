module.exports = function (app) {
  const populateUser = require('../middleware/populate-user')
  const { onlyEditor } = require('../middleware/auth-check')

  const {
    getMenuByName,
    getMenusList,
    createMenu,
    getMenu,
    updateMenu,
    removeMenu,
    getCachedMenu
  } = require('../controllers/menus')

  // menus routes
  app
    .get('/api/menus', populateUser, onlyEditor, getMenusList) // only editor or admin can get ALL menus names
    .post('/api/menus', populateUser, onlyEditor, createMenu)
    .get('/api/menus/:menuName', getCachedMenu, getMenuByName, getMenu)
    .put('/api/menus/:menuName', populateUser, onlyEditor, getMenuByName, updateMenu)
    .delete('/api/menus/:menuName', populateUser, onlyEditor, getMenuByName, removeMenu)
}
