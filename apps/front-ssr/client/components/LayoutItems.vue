<template>
  <component
    v-for="(item, index) in items" :key="index"
    :is="internals[item.component] || item.component" :class="item.classes" v-bind="item.props">
    <template v-if="item.children && item.children.length">
      <LayoutItems :items="item.children" :internals="internals"/>
    </template>
  </component>
</template>

<script lang="ts">
import {LayoutItem} from './types/layout';
import {ComponentsMap} from '../services/layout';

export default {
  name: 'LayoutItems',
  props: {
    items: Array as () => LayoutItem[],
    internals: Object as () => ComponentsMap
  },
}
</script>
