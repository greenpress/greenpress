<template>
  <div class="layouts-page">
    <ListPageTitle title="Layouts" create-route="createLayout"/>
    <LayoutsList/>
  </div>
</template>
<script lang="ts" setup>
import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
import LayoutsList from '@/modules/layouts/components/LayoutsList.vue';
</script>
