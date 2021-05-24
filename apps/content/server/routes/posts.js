module.exports = function (app) {
  const populateUser = require('../middleware/populate-user')
  const { onlyEditor } = require('../middleware/auth-check')

  const { getCategoryMetadataByPath } = require('../controllers/categories')

  const {
    getPostById, buildPostsByAuthorQuery,
    getPostsList, createPost, getPostByPath, getPost,
    updatePost,
    removePost
  } = require('../controllers/posts')

  // posts routes - from category and from posts directly
  app
    .get('/api/categories/:categoryPath/posts', populateUser, getCategoryMetadataByPath, getPostsList)
    .post('/api/categories/:categoryPath/posts', populateUser, onlyEditor, getCategoryMetadataByPath, createPost)
    .get('/api/categories/:categoryPath/posts/:postPath',populateUser,  getCategoryMetadataByPath, getPostByPath, getPost)
    .put('/api/categories/:categoryPath/posts/:postPath', populateUser, onlyEditor, getCategoryMetadataByPath, getPostByPath, updatePost)
    .delete('/api/categories/:categoryPath/posts/postPath', populateUser, onlyEditor, getCategoryMetadataByPath, getPostByPath, removePost)

  app
    .get('/api/posts', populateUser, getPostsList)
    .post('/api/posts', populateUser, onlyEditor, createPost)
    .get('/api/posts/:postId', populateUser, onlyEditor, getPostById, getPost)
    .put('/api/posts/:postId', populateUser, onlyEditor, getPostById, updatePost)
    .delete('/api/posts/:postId', populateUser, onlyEditor, getPostById, removePost)

  app
    .get('/api/posts/:categoryPath/:postPath', populateUser, getCategoryMetadataByPath, getPostByPath, getPost)
    .put('/api/posts/:categoryPath/:postPath', populateUser, onlyEditor, getCategoryMetadataByPath, getPostByPath, updatePost)
    .delete('/api/categories/:categoryPath/postPath', populateUser, onlyEditor, getCategoryMetadataByPath, getPostByPath, removePost)

	app.get('/api/author/:authorId/posts', populateUser, buildPostsByAuthorQuery, getPostsList);
}
