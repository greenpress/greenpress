import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4fd23464 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _45b930ca = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _1c8c83de = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _eb6bc62e = () => interopDefault(import('../pages/tag/_tag.vue' /* webpackChunkName: "pages/tag/_tag" */))
const _6d3a6be9 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _40620812 = () => interopDefault(import('../pages/_category/index.vue' /* webpackChunkName: "pages/_category/index" */))
const _42750624 = () => interopDefault(import('../pages/_category/_post.vue' /* webpackChunkName: "pages/_category/_post" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/search",
    component: _4fd23464,
    name: "search"
  }, {
    path: "/signin",
    component: _45b930ca,
    name: "signin"
  }, {
    path: "/signup",
    component: _1c8c83de,
    name: "signup"
  }, {
    path: "/tag/:tag?",
    component: _eb6bc62e,
    name: "tag-tag"
  }, {
    path: "/",
    component: _6d3a6be9,
    name: "index"
  }, {
    path: "/:category",
    component: _40620812,
    name: "category"
  }, {
    path: "/:category/:post",
    component: _42750624,
    name: "category-post"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
