<template>
  <div class="create-plugin-page" v-if="plugin">
    <PluginForm :plugin="plugin" :submitting="submitting" @submitted="savePlugin"/>
  </div>
</template>
<script lang="ts" setup>
import PluginForm from './components/PluginForm.vue';
import {useCreatePlugin} from './compositions/manage-plugin';

const {plugin, submitting, savePlugin} = useCreatePlugin();
</script>
