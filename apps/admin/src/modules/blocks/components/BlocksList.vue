<template>
  <div>
    <GpItem v-for="block in state.blocks" :key="block._id">
      <template v-slot:title>
        <router-link :to="{name: 'editBlock', params: {blockId: block._id}}">
          {{ block.name }}
        </router-link>
      </template>
      <div class="metadata">{{ block.description }}</div>
      <template v-slot:actions>
        <a @click.prevent="askBeforeRemove(block)">
          <el-icon><icon-delete/></el-icon> {{ $t('Remove') }}
        </a>
      </template>
    </GpItem>
  </div>
</template>
<script lang="ts" setup>
import {useConfirmAction} from '../../core/compositions/confirm-action'
import GpItem from '../../core/components/layout/GpItem.vue';
import {useBlocksList} from '@/modules/blocks/store/blocks-list';

const state = useBlocksList()

const askBeforeRemove = useConfirmAction(state.removeBlock);
</script>
<style scoped>
.metadata {
  padding-bottom: 15px;
}
</style>
