<template>
  <div class="blocks-page">
    <ListPageTitle title="Blocks" create-route="createBlock"/>
    <BlocksList/>
  </div>
</template>
<script lang="ts" setup>
import BlocksList from './components/BlocksList.vue'
import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
</script>
