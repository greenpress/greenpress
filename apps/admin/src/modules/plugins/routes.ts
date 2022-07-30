import EmptyRoute from '@/modules/core/components/layout/EmptyRoute.vue';


export const managePluginsRoutes = {
  path: 'plugins',
  component: EmptyRoute,
  redirect: { name: 'menus' },
  children: [
    {
      path: '',
      name: 'plugins',
      component: async () => (await import('./Plugins.vue')).default
    },
    {
      path: ':pluginId',
      name: 'editPlugin',
      component: EmptyRoute
    }
  ]
};


export const playRoutes = {
  path: 'play',
  name: 'playPlugin',
  component: EmptyRoute,
  children: [{
    name: 'defaultPluginPlaceholder',
    path: ':all',
    component: EmptyRoute,
  }]
};
