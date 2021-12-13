<template>
  <Layout :layout="layout"/>
</template>

<script lang="ts">
import {useHydration} from 'fastify-vite-vue/client.mjs';
import Layout from '../src/components/Layout.vue';
import sdk from '../src/services/sdk';
import {LayoutItem} from '../src/components/types/layout';

export const path = '/search'

export default {
  components: {Layout},
  async setup() {
    const {$payload} = await useHydration({getPayload: getPayload, getData: false});
    return $payload as { layout: LayoutItem[] };
  }
}

export const getPayload = import.meta.env.SSR ?
  async function getPayload({req}) {
    const [posts, mainMenu] = await Promise.all([
      (sdk.posts.getList({target: 'front', q: req.query.q}).catch(() => [])),
      (sdk.menus.getMenu('main').catch(() => ({}))),
    ])
    return {
      sharedData: {
        searchedPosts: posts,
        mainMenu,
      },
      layout: [
        {
          component: 'header',
          children: [
            {
              component: 'MainMenu',
              props: {
                menu: 'mainMenu'
              },
              predefined: true,
            },
            {
              component: 'SearchForm',
              predefined: true,
            },
          ]
        },
        {
          component: 'main',
          children: [
            {
              component: 'PostsList',
              predefined: true,
              props: {
                posts: 'searchedPosts'
              }
            }
          ]
        }
      ]
    }
  } :
  true;
</script>
