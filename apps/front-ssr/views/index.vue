<template>
  <Layout :layout="layout"/>
</template>

<script lang="ts">
import {useHydration} from 'fastify-vite-vue/client.mjs'
import sdk from '../src/services/sdk';
import Layout from '../src/components/Layout.vue';
import {LayoutItem} from '../src/components/types/layout';

export const path = '/'

export default {
  components: {Layout},
  async setup() {
    const {$payload} = await useHydration({getPayload: getPayload, getData: false});
    return $payload as { layout: LayoutItem[] };
  }
}

export const getPayload = import.meta.env.SSR ?
  async function getPayload() {
  const [posts, menu] = await Promise.all([
    (sdk.posts.getList({target: 'front'}).catch(() => [])),
    (sdk.menus.getMenu('main').catch(() => ({}))),
  ])
    return {
      layout: [
        {
          component: 'header',
          children: [
            {
              component: 'MainMenu',
              props: {
                menu
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
                posts
              }
            }
          ]
        }
      ]
    }
  } :
  true;
</script>
