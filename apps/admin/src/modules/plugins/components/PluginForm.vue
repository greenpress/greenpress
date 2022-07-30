<template>
  <el-form @submit.native.prevent="submit">
    <EditPluginHeader :plugin="plugin" :submitting="submitting"/>
  </el-form>
</template>
<script lang="ts" setup>
import EditPluginHeader from './EditPluginHeader.vue';

import {IPlugin} from '@/services/types/plugin';

const props = defineProps({
  plugin: Object as () => IPlugin,
  submitting: Boolean
});

const submit = () => alert('soon');
</script>
