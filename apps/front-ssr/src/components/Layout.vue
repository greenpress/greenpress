<template>
  <LayoutItems :items="layout" :internals="internalComponents"/>
</template>

<script lang="ts">
import {LayoutItem} from './types/layout';
import {getLazyLayoutComponents} from '../services/layout';
import LayoutItems from './LayoutItems.vue';

export default {
  name: 'Layout',
  components: {LayoutItems},
  props: {
    layout: Array as () => LayoutItem[]
  },
  async setup(props: { layout: LayoutItem[] }) {
    const internalComponents = await getLazyLayoutComponents(props.layout);

    return {internalComponents}
  }
}
</script>
<style scoped>

</style>
