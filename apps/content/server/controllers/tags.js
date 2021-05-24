const Post = require('../models/post')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'tags:'

const LIMIT = 30
const MAX_LIMIT = 300

function getTagsAggregationQuery (tenant, isPublic = true) {
  return [
    { $match: { tenant, isPublic } },
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
	{ $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]
}

function getTagPosts (tenant, tag, limit, offset, isPublic = true) {
  return Post
    .find({ tags: tag, tenant, isPublic })
    .select('-content -tenant')
    .sort({ created: -1 })
    .populate('category', 'path name')
    .limit(limit > MAX_LIMIT ? MAX_LIMIT : limit)
    .skip(offset)
    .lean()
    .then(list => list ? JSON.stringify(list) : '[]')
}

function getTagsList (req, res) {
  cacheManager.wrap(
    cachePrefix + 'all:' + req.headers.tenant,
    () => Post.aggregate(getTagsAggregationQuery(req.headers.tenant))
      .then(tags => JSON.stringify(tags) || '[]')
  )
    .then(list => {
      res.status(200).set('Content-Type', 'application/json').end(list)
    })
    .catch(() => res.status(500).json({ message: 'failed to load tags list' }).end())
}

function getPostsByTag (req, res) {
  const reqQuery = { ...req.query || {} }

  const tenant = req.headers.tenant;
  const tag = req.params.tag
  const limit = parseInt(reqQuery.limit) || LIMIT
  const offset = parseInt(reqQuery.offset) || 0

  cacheManager.wrap(
    `${cachePrefix}postsByTag.strigified:${tenant}.${tag}.${limit}.${offset}`,
    () => getTagPosts(tenant, tag, limit, offset)
  )
    .then(list => {
      res.status(200).set('Content-Type', 'application/json').end(list)
    })
    .catch(() => {
      res.status(500).json({ message: 'failed to load posts list' }).end()
    })
}

module.exports = {
  getTagsList,
  getPostsByTag
}
