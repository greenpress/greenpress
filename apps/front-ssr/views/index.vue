<template>
  <Layout :layout="layout"/>
</template>

<script lang="ts">
import { useHydration } from 'fastify-vite-vue/client.mjs'

import Layout from '../src/components/Layout.vue';

export const path = '/'

export default {
  components: {Layout},
  async setup() {
    const { $payload } = await useHydration();
    return $payload;
  }
}

export function getPayload() {
  return {
    layout: [
      {
        component: 'header',
        classes: ['my-header'],
        props: {
          dir:'rtl'
        },
        children: [
          {
            component: 'SearchForm',
            predefined: true,
            classes: ['my-search']
          },
        ]
      }
    ]
  }
}
</script>
