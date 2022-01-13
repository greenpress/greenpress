<template>
  <Layout :layout="layout" :connected-data="connectedData"/>
</template>
<script lang="ts">
import {useHydration} from 'fastify-vite-vue/client.mjs'
import {loadLayoutPayload} from '../src/services/sdk';
import Layout from '../src/components/Layout.vue';
import {LayoutItem} from '../src/components/types/layout';

export const path = '/:category'

export default {
  components: {Layout},
  async setup() {
    const {$payload} = await useHydration({getPayload: getPayload, getData: false});
    return $payload as { layout: LayoutItem[], connectedData: any[] };
  }
}

export const getPayload = loadLayoutPayload;
</script>

