<template>
  <div>
    <GpItem v-for="layout in layouts" :key="layout.kind">
      <template v-slot:title>
        <router-link :to="{name: 'editLayout', params: {kind: layout.kind}}">
          {{ layout.displayName }}
        </router-link>
      </template>
      <div class="metadata"></div>
    </GpItem>
  </div>
</template>
<script lang="ts" setup>
import GpItem from '../../core/components/layout/GpItem.vue';

const layouts = [
  {kind: 'index', displayName: 'Index / Home'},
  {kind: 'category', displayName: 'Category'},
  {kind: 'post', displayName: 'Post'},
  {kind: 'tag', displayName: 'Tags List'},
  {kind: 'search', displayName: 'Search'},
]
</script>
<style scoped>
.metadata {
  padding-bottom: 15px;
}
</style>
