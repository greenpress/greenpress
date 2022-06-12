<template>
  <div v-if="layout">
    <LayoutForm :layout="layout" :submitting="submitting" @submitted="updateLayout" />
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {useEditLayout} from './compositions/layouts'
import LayoutForm from './components/LayoutForm.vue';
import {LayoutKind} from '@greenpress/sdk/dist/layouts';

const kind = useRoute().params.kind as LayoutKind;
const {layout, submitting, updateLayout} = useEditLayout(kind);
</script>
<style scoped>
textarea {
  width: 100%;
  min-height: 500px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
