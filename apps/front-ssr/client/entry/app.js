import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createBeforeEachHandler, createBeforeEachSSRHandler } from './core.js'

import base from './base.vue'
import routes from './routes.js'

const createHistory = import.meta.env.SSR
  ? createMemoryHistory
  : createWebHistory

export async function createApp (ctx) {
  const resolvedRoutes = await routes()
  const app = createSSRApp(base)
  const head = createHead()
  const router = createRouter({
    history: createHistory(),
    routes: resolvedRoutes,
  })
  if (import.meta.env.SSR) {
    router.beforeEach(createBeforeEachSSRHandler(resolvedRoutes, ctx))
  } else {
    router.beforeEach(createBeforeEachHandler(resolvedRoutes))
  }
  app.use(createPinia())
  app.use(router)
  app.use(head)
  return { ctx, app, head, router, routes: resolvedRoutes }
}
