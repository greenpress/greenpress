<template>
  <div class="category-page">
    <PageTitle :title="$route.params.menuName ? 'Edit Menu' : 'Create Menu'" :item-name="$route.params.menuName"/>
    <MenuEditor :menu="$route.params.menuName"/>
  </div>
</template>
<script lang="ts" setup>
import MenuEditor from './components/MenuEditor.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
</script>
