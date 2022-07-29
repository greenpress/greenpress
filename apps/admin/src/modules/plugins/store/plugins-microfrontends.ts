import {computed, watch} from 'vue';
import {useRouter} from 'vue-router';
import {defineStore, storeToRefs} from 'pinia';
import {usePluginsList} from './plugins-list';
import MicroFrontendPage from '../MicroFrontendPage.vue';

export const usePluginsMicroFrontends = defineStore('plugins-micro-frontends', function usePluginsMicroFrontends() {
  const {plugins} = storeToRefs(usePluginsList());
  const router = useRouter();

  const microFrontends = computed(() => {
    const data = {top: [], bottom: []};
    if (!plugins.value) {
      return data;
    }
    return plugins.value.reduce((routes, plugin) => {
      plugin.microFrontends?.filter(frontend => frontend.active && !!frontend.route)
        .forEach(frontend => {
          if (frontend.route.navBarPosition === 'top') {
            routes.top.push(frontend);
          } else {
            routes.bottom.push(frontend);
          }
        });
      return routes;
    }, data)
  });

  const unwatch = watch(microFrontends, ({top, bottom}) => {
    [...top, ...bottom].forEach(frontend => {
      router.addRoute('playPlugin', {
        name: `plugin.${frontend.name}`,
        path: frontend.route.path,
        meta: {
          roles: frontend.route.roles || ['*'],
          microfUrl: frontend.url,
        },
        component: MicroFrontendPage
      })
    })
    router.removeRoute('defaultPluginPlaceholder');
    router.push(router.currentRoute.value.fullPath);
    unwatch();
  });

  return {
    microFrontends
  }
})
