<template>
  <Layout v-if="payload.layout" :layout="payload.layout" :connected-data="payload.connectedData"/>
</template>

<script lang="ts">
import {usePayload} from 'fastify-vite-vue/app'
import {loadLayoutPayload} from '../src/services/sdk';
import Layout from '../src/components/Layout.vue';
import {LayoutItem} from '../src/components/types/layout';

export const path = '/'

export default {
  components: {Layout},
  setup() {
    const payload = usePayload() as { layout: LayoutItem[], connectedData: any[] };
    return {payload}
  }
}

export const getPayload = (ctx) => loadLayoutPayload('index', ctx);
</script>
