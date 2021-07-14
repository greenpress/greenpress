const Menu = require('../models/menu')
const cacheManager = require('../utils/cache-manager')

const cachePrefix = 'menu:'

const categoryPopulation = {
  path: 'links.category',
  select: 'path name _id'
}
const linkPopulation = {
  path: 'links.post',
  select: 'path category _id title',
  populate: {
    path: 'category',
    select: 'path _id'
  }
}

function getCachedName (tenant, menuName) {
  return cachePrefix + tenant + ':' + menuName
}

function getCachedMenu (req, res, next) {
  const tenant = req.headers.tenant
  const menuName = req.params.menuName
  cacheManager.getItem(getCachedName(tenant, menuName)).then(menu => {
    if (menu) {
      res.status(200).set('Content-Type', 'application/json').end(menu)
    } else {
      next()
    }
  }).catch(() => {
    next()
  })
}

function setCachedMenu (menu) {
  cacheManager.setItem(getCachedName(menu.tenant, menu.name), JSON.stringify(menu.toObject ? menu.toObject() : menu))
}

function populateMenu (menu) {
  return menu.populate(categoryPopulation).populate(linkPopulation)
}

function getMenuByName (req, res, next) {
  populateMenu(Menu.findOne({ name: req.params.menuName, tenant: req.headers.tenant })).then(menu => {
    if (!menu) {
      return Promise.reject(null)
    }
    req.menu = menu
    setCachedMenu(menu)
    next()
  }).catch(() => {
    res.status(404).json({ message: 'menu not exists' }).end()
  })
}

function getMenusList (req, res) {
  Menu.distinct('name', { tenant: req.headers.tenant })
    .then(list => {
      if (!list) {
        return Promise.reject(null)
      }
      res.status(200).json(list).end()
    })
    .catch(() => {
      res.status(400).json({ message: 'failed to load menus list' }).end()
    })
}

function getMenu (req, res) {
  res.status(200).json(req.menu).end()
}

function createMenu (req, res) {
  const body = req.body || {}
  body.tenant = req.headers.tenant

  if (!(body.links && body.links instanceof Array)) {
    res.status(400).json({ message: 'menu links are missing' }).end()
    return
  }

  const menu = new Menu({
    tenant: req.headers.tenant,
    name: body.name,
    links: flattenLinks(body.links),
  })

  saveAndPopulate(menu)
    .then((menu) => {
      if (!menu) {
        return Promise.reject(null)
      }
      res.status(200).json(menu).end()
    })
    .catch(() => {
      res.status(400).json({ message: 'menu creation failed' }).end()
    })
}

function updateMenu (req, res) {
  const body = req.body || {}
  const menu = req.menu

  if (menu.name !== body.name) {
    menu.name = body.name
  }
  menu.links = flattenLinks(body.links)

  saveAndPopulate(menu)
    .then((menu) => {
      if (!menu) {
        return Promise.reject(null)
      }
      res.status(200).json(menu).end()
    })
    .catch(() => {
      res.status(400).json({ message: 'menu update failed' }).end()
    })
}

function removeMenu (req, res) {
  const menu = req.menu

  menu.remove()
    .then(menu => {
      res.status(200).json(menu).end()
    })
    .catch(() => {
      res.status(400).json({ message: 'menu remove failed' }).end()
    })
}

function saveAndPopulate (menu) {
  return menu.save()
    .then(menu => {
      if (!menu) {
        return Promise.reject(null)
      }
      return populateMenu(Menu.findOne({ name: menu.name })).lean()
    })
}

function flattenLinks (links = []) {
  return links
    .filter(link => link && link.kind)
    .map((link) => {
      const newLink = { kind: link.kind, _id: link._id }
      switch (newLink.kind) {
      case 'category':
        newLink.category = link.value || (link.category || {})._id || link.category
        break
      case 'post':
        newLink.post = link.value || (link.post || {})._id || link.post
        break
      case 'http':
        newLink.value = link.value
        break
      default:
        return
      }

      return newLink
    })
}

module.exports = {
  getMenuByName,
  getMenusList,
  getMenu,
  createMenu,
  updateMenu,
  removeMenu,
  getCachedMenu
}
