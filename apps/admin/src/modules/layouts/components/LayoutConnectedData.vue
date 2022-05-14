<template>
  <div class="list">
    <div v-for="(cd, index) in connectedData" :key="index" class="item">
      <el-icon class="delete" @click="$emit('remove', cd)"><icon-delete/></el-icon>
      <h4>{{cd.reference}}</h4>
      <div v-if="cd.identifier">{{cd.kind}}: {{cd.identifier}}</div>
      <div v-else>{{cd.kind}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {LayoutConnectedDataKind} from '@greenpress/sdk/dist/layouts';

interface IConnectedData {
  kind: LayoutConnectedDataKind;
  data?: any;
  identifier: string;
  reference: string;
  context?: any;
}

const props = defineProps({
  connectedData: {
    type: Array as () => IConnectedData[],
    default: () => [],
  }
});


</script>

<style scoped>
.list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.item {
  flex: 0;
  background-color: var(--secondary-color);
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  transition: background-color 0.2s linear;
}

.item:hover {
  background-color: var(--negative-color);
}

.delete {
  cursor: pointer;
}
</style>
