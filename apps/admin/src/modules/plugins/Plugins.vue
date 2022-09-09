<template>
  <div class="plugins-page">
    <ListPageTitle title="Your Plugins" create-route="createPlugin" />
    <YourPluginsList/>
  </div>
</template>
<script lang="ts" setup>
import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
import YourPluginsList from './components/YourPluginsList.vue';
</script>
