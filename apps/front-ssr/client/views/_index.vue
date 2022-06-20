<template>
  <Layout v-if="payload.layout" :config="config" :kind="kind" :layout="payload.layout" :connected-data="payload.connectedData"/>
</template>

<script lang="ts">
import {usePayload} from '../entry/core.js';
import {loadAll} from '../services/sdk';
import Layout from '../components/Layout.vue';
import {LayoutItem} from '../components/types/layout';
import {IAppConfiguration} from '@greenpress/sdk/dist/configurations';

export const route = '/'
export const name = 'home'

export default {
  components: {Layout},
  setup() {
    const [payload, config] = usePayload() as [
      payload: { layout: LayoutItem[], connectedData: any[] },
      appConfiguration: IAppConfiguration
    ];
    return {payload, config, kind: 'index'}
  }
}

export const getPayload = (ctx) => loadAll('index', ctx);
</script>
