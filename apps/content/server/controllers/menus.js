const Menu = require('../models/menu')

function getMenuByName (req, res, next) {
  Menu.findOne({ name: req.params.menuName, tenant: req.headers.tenant })
    .enrichment()
    .exec()
    .then(menu => {
      if (!menu) {
        return Promise.reject(null)
      }
      req.menu = menu
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

async function getMenu(req, res) {
  const useCache = req.query.target === 'front' || !(req.user?.isEditor);

  if (useCache) {
    const menu = await Menu.findOne({ name: req.params.menuName, tenant: req.headers.tenant })
    .enrichment().exec()
    
    res.status(200).json(menu).end()
    menu.storeInCache();
  } else {
    const menu = Menu.getSingleMenu({ name: req.params.menuName, tenant: req.headers.tenant });
    res.status(200).set('Content-Type', 'application/json').end(menu)
  }
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
      menu.storeInCache()
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
      menu.storeInCache()
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
      menu.clearInCache()
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
      return Menu.findOne({ name: menu.name, tenant: menu.tenant }).enrichment().exec();
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
}
