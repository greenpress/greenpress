<template>
  <div>
    <GpItem v-for="block in blocks" :key="block._id">
      <template v-slot:title>
        <router-link :to="{name: 'editBlock', params: {blockId: block._id}}">
          {{ block.name }}
        </router-link>
      </template>
      <div class="metadata">{{ block.description }}</div>
      <template v-slot:actions>
        <a @click.prevent="askBeforeRemove(block)">
          <i class="el-icon-delete"/>{{ $t('Remove') }}
        </a>
      </template>
    </GpItem>
  </div>
</template>
<script lang="ts">
import {useBlocksList} from '../compositions/blocks'
import {useConfirmAction} from '../../core/compositions/confirm-action'
import GpItem from '../../core/components/layout/GpItem.vue';

export default {
  name: 'CategoriesList',
  components: {GpItem},
  setup() {
    const {blocks, removeBlock} = useBlocksList()

    return {
      blocks,
      askBeforeRemove: useConfirmAction(removeBlock),
    }
  }
}
</script>
<style scoped>
.metadata {
  padding-bottom: 15px;
}
</style>
