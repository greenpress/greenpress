<template>
  <Layout :layout="layout"/>
</template>

<script lang="ts">
import {useHydration} from 'fastify-vite-vue/client.mjs'
import sdk from '../src/services/sdk';
import Layout from '../src/components/Layout.vue';

export const path = '/'

export default {
  components: {Layout},
  async setup() {
    const {$payload} = await useHydration({getPayload: true});
    return $payload;
  }
}

let payloadFn = async () => null;

if (import.meta.env.SSR) {
  payloadFn = async function getPayload() {
    return {
      layout: [
        {
          component: 'header',
          classes: ['my-header'],
          children: [
            {
              component: 'SearchForm',
              predefined: true,
              classes: ['my-search']
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
                posts: await (sdk.posts.getList({target: 'front'}).catch(() => []))
              }
            }
          ]
        }
      ]
    }
  }
}

export const getPayload = payloadFn;
</script>
