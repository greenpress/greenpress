<template>
  <div class="list">
    <router-link v-for="(cd, index) in connectedData" :key="index" class="item" :to="getRouteParams(cd)">
      <el-icon class="delete" @click.native.prevent="$emit('remove', cd)">
        <icon-delete/>
      </el-icon>
      <h4>{{ cd.reference }}</h4>
      <div v-if="cd.identifier">{{ cd.kind }}: {{ cd.identifier }}</div>
      <div v-else>{{ cd.kind }}</div>
    </router-link>
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


function getRouteParams(connectedData: IConnectedData) {
  if (connectedData.kind === LayoutConnectedDataKind.BLOCK) {
    return {name: 'editBlock', params: {blockId: connectedData.identifier}}
  }
  if (connectedData.kind === LayoutConnectedDataKind.POSTS) {
    return {
      name: 'posts',
      query: connectedData.context || {}
    }
  }
  if (connectedData.kind === LayoutConnectedDataKind.MENU) {
    return {
      name: 'editMenu',
      params: {
        menuName: connectedData.identifier
      },
    }
  }
  return '/'
}

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
  cursor: pointer;
}

.item:hover {
  background-color: var(--negative-color);
}

.delete {
  cursor: pointer;
}
</style>
