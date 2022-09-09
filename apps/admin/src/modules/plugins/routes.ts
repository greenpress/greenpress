import EmptyRoute from '@/modules/core/components/layout/EmptyRoute.vue';


export const managePluginsRoutes = {
  path: 'plugins',
  component: EmptyRoute,
  redirect: {name: 'plugins'},
  children: [
    {
      path: '',
      name: 'plugins',
      component: async () => (await import('./Plugins.vue')).default
    },
    {
      path: 'new',
      name: 'createPlugin',
      component: async () => (await import('./CreatePlugin.vue')).default
    },
    {
      path: ':pluginId',
      name: 'editPlugin',
      component: async () => (await import('./EditPlugin.vue')).default
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
