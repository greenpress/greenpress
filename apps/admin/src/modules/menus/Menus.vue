<template>
  <div class="menus-page">
    <ListPageTitle title="Menus" create-route="createMenu"/>
    <MenusList/>
  </div>
</template>
<script lang="ts" setup>
import MenusList from './components/MenusList.vue'
import ListPageTitle from '@/modules/core/components/semantics/ListPageTitle.vue'
</script>
