<template>
  <Layout v-if="payload.layout" :layout="payload.layout" :connected-data="payload.connectedData"/>
</template>
<script lang="ts">
import {usePayload} from '../entry/core.js';
import {loadLayoutPayload} from '../services/sdk';
import Layout from '../components/Layout.vue';
import {LayoutItem} from '../components/types/layout';

export const route = '/:category/'
export const name = 'category'

export default {
  components: {Layout},
  setup() {
    const payload = usePayload() as { layout: LayoutItem[], connectedData: any[] };
    return {payload}
  }
}

export const getPayload = (ctx) => loadLayoutPayload('category', ctx);
</script>
