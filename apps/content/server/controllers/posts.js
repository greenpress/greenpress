const { getUsersMap } = require('../utils/users')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Category = require('../models/category')

const LIMIT = 30
const MAX_LIMIT = 300

function getCategoryIdByPathOrId (tenant, categoryPath, categoryId) {
  if (categoryId) {
    return Promise.resolve(categoryId)
  }
  if (categoryPath) {
    return Category.getCategoryIdByPath(tenant, categoryPath)
  }
  return Promise.resolve(null)
}

function getDisplayPost (post, category, authorsMap = {}, comments) {
  const authors = post.authors.map(id => authorsMap[id]).filter(Boolean);
  return Object.assign(post, {
    authors,
    category: {
      name: category.name,
      path: category.path
    },
    comments: comments ? comments.map(c => c.author = authorsMap[c.author]) : undefined
  })
}

function getPostQuery (tenant, path, category, isLean) {
  const query = Post.findOne({ tenant, path, category })

  if (isLean) {
    return query.select('-editorContentsStates -tenant').lean()
  }
  return query
}

function getPostByPath (req, res, next) {
  getPostQuery(
    req.headers.tenant,
    req.params.postPath,
    req.category._id,
    req.query.target === 'front' || !(req.user && req.user.isEditor)
  )
    .then(post => {
      if (!post) {
        return Promise.reject(null)
      }
      req.post = post
      return next()
    })
    .catch(() => res.status(404).json({ message: 'post not exists' }).end())
}

function getPostById (req, res, next) {
  Post.findOne({ _id: req.params.postId, tenant: req.headers.tenant })
    .populate('category', 'name path')
    .then(post => {
      if (!post) {
        return Promise.reject(null)
      }
      req.post = post
      req.category = post.category
      return next()
    })
    .catch(() => res.status(404).json({ message: 'post not exists' }).end())
}

function buildPostsByAuthorQuery(req, res, next) {
	req.query = { authors: req.params.authorId, populate: ["category"] };
	next();
}

function getPostsList (req, res) {
  const reqQuery = { ...req.query || {} }
  const isFrontTargeted = reqQuery.target === 'front' || !(req.user && req.user.isEditor)
  const populate = reqQuery.populate || [];

  const query = isFrontTargeted ? { isPublic: true } : {}

  query.tenant = req.headers.tenant

  const isLean = reqQuery.lean === 'true'
  const limit = parseInt(reqQuery.limit) || LIMIT
  const offset = parseInt(reqQuery.offset) || 0
  const populateCategories = populate.includes('category')

  const freeTextSearch = reqQuery.q ? {
    text: reqQuery.q,
    basic: isLean
  } : null

  if (req.category || reqQuery.category) {
    query.category = req.category._id
  }

  getCategoryIdByPathOrId(req.headers.tenant, reqQuery.category, req.category && req.category._id)
    .then(categoryId => {
      if (categoryId) {
        query.category = categoryId
      }
    })
    .then(() => Post.search(
      query,
      freeTextSearch,
      isLean ? 'title category' : '-contents -editorContentsStates',
      {
        limit: limit > MAX_LIMIT ? MAX_LIMIT : limit,
        offset,
        categoriesFields: populateCategories ? 'path name' : null,
      }, isFrontTargeted)
    )
    .then(data => {
      if (!data) {
        return Promise.reject(null)
      }
      res.status(200).set('Content-Type', 'application/json').end(data)
    })
    .catch((err) => {
      res.status(400).json({ message: 'failed to load posts list' }).end()
    })
}

function getPost (req, res) {
  Comment.find({ post: req.post._id, tenant: req.headers.tenant }).lean()
    .then(comments => comments || [], () => [])
    .then(comments => {
      const authors = comments.map(c => c.author).concat(req.post.authors)
      req.comments = comments
      return getUsersMap(req.headers.tenant, authors)
    })
    .then(authorsMap => {
      res.status(200)
        .json(
          getDisplayPost(
            req.post.toObject ? req.post.toObject() : req.post,
            req.category,
            authorsMap,
            req.comments)
        ).end()
    })
}

function createPost (req, res) {
  const body = req.body || {}

  Category.getCategoryIdByPath(req.headers.tenant, body.category)
    .then(categoryId => categoryId || Promise.reject('category path does not exist'))
    .then(categoryId => {
      body.category = categoryId
      body.tenant = req.headers.tenant
      body.authors = body.authors || []

      if (!body.authors.includes(req.user._id)) {
        body.authors.push(req.user._id)
      }
      return (new Post(body)).save()
    })
    .then(post => {
      if (!post) {
        return Promise.reject(null)
      }
      post = post.toObject()
      post.category = body.category
      res.status(200).json(post).end()
    })
    .catch((err) => res.status(400).json({ message: err || 'post creation failed' }).end())
}

function updatePost (req, res) {
  const body = req.body || {}
  delete body.tenant;
  const post = req.post

  if (!post.authors.includes(req.user._id)) {
    post.authors.push(req.user._id)
  }
  Promise.resolve(body)
    .then(body => {
      // category replaced
      if (body.category && body.category !== req.category.path) {
        return Category.getCategoryIdByPath(req.headers.tenant, body.category).then(_id => {
          body.category = _id
          req.category = {
            _id,
            tenant: req.headers.tenant,
            path: body.category
          };
          return body
        })
      }
      delete body.category
      return body
    })
    .then(body => Object.assign(post, body).save())
    .then(post => {
      res.status(200).json(getDisplayPost(post.toObject(), req.category)).end()
    })
    .catch(() => res.status(400).json({ message: 'post update failed' }).end())
}

function removePost (req, res) {
  const post = req.post

  post.remove()
    .then(post => {
      res.status(200).json(getDisplayPost(post.toObject(), req.category)).end()
    })
    .catch(() => res.status(400).json({ message: 'post remove failed' }).end())
}

module.exports = {
  getPostByPath,
  getPostById,
  buildPostsByAuthorQuery,
  getPostsList,
  getPost,
  createPost,
  updatePost,
  removePost,
}
