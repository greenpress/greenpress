<template>
  <LayoutItems v-if="layout" :items="layout" :internals="internalComponents"/>
</template>

<script lang="ts">
import {LayoutItem} from './types/layout';
import {getLazyLayoutComponents} from '../services/layout';
import LayoutItems from './LayoutItems.vue';

export default {
  name: 'Layout',
  components: {LayoutItems},
  props: {
    layout: Array as () => LayoutItem[],
    connectedData: Array as () => { kind: string, identifier: string, data: any, reference: string }[]
  },
  async setup(props: { layout: LayoutItem[], connectedData: any[] }) {
    const references = new Map<string, any>();
    props.connectedData.forEach(({reference, data}) => references.set(reference, data));

    const internalComponents = await getLazyLayoutComponents(props.layout, references);

    return {internalComponents}
  }
}
</script>
<style scoped>

</style>
