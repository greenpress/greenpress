<template>
  <div class="storage-page">
    <ListPageTitle title="Storage" create-route="addStorage"/>
    <AssetsStorageList/>
  </div>
</template>
<script lang="ts" setup>
import AssetsStorageList from './components/AssetsStorageList.vue'
import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
</script>
<style scoped>
p {
  padding: 5px 10px;
}
</style>
