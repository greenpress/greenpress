<template>
  <div class="list">
    <router-link v-for="(cd, index) in items" :key="index" class="item" :to="getRouteParams(cd)">
      <el-icon class="delete" @click.native.prevent="$emit('remove', cd)">
        <icon-delete/>
      </el-icon>
      <div v-if="cd.identifier">{{ cd.kind }}: <strong>{{ cd.displayName || cd.identifier }}</strong></div>
      <div v-else>{{ cd.kind }}</div>
      <small>{{ cd.reference }}</small>
    </router-link>
  </div>
</template>

<script setup lang="ts">

import {LayoutConnectedDataKind} from '@greenpress/sdk/dist/layouts';
import {useBlocksList} from '@/modules/blocks/compositions/blocks-list';
import {computed, toRef} from 'vue';

interface IConnectedData {
  kind: LayoutConnectedDataKind;
  data?: any;
  identifier: string;
  reference: string;
  context?: any;
}

const blocks = toRef(useBlocksList(), 'blocks');

const props = defineProps({
  connectedData: {
    type: Array as () => IConnectedData[],
    default: () => [],
  }
});

const blocksMap = computed(
    () => (blocks.value || []).reduce((map, block) => {
      map[block._id] = block;
      return map;
    }, {})
);

const items = computed(() => {
  return props.connectedData.map(cd => {
    let displayName;
    if (cd.kind === 'block') {
      displayName = blocksMap.value[cd.identifier]?.name;
    }
    return {
      ...cd,
      displayName
    }
  })
})


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
