import { GETTERS, DATA } from './consts'

export default {
  [GETTERS.MAIN_MENU_LINKS]: state => {
    const menu = state[DATA.MAIN_MENU]
    const links = menu ? menu.links : []
    return links.map(link => {
      switch (link.kind) {
        case 'category':
          return {
            name: link.category.name,
            kind: link.kind,
            route: {
              name: 'category',
              params: {
                category: link.category.path,
              }
            }
          }
        case 'post':
          return {
            name: link.post.title,
            kind: link.kind,
            route: {
              name: 'category-post',
              params: {
                category: link.post.category.path,
                post: link.post.path,
              }
            }
          }
        case 'http':
          return {
            name: link.value.text,
            kind: link.kind,
            route: link.value.url,
            newWindow: link.value.newWindow
          }
      }
    })
  }
}
