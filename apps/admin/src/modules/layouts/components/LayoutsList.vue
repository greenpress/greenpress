<template>
  <div>
    <GpItem v-for="layout in layouts" :key="layout.kind">
      <template v-slot:title>
        <router-link :to="{name: 'editLayout', params: {kind: layout.kind}}">
          {{ layout.kind }}
        </router-link>
      </template>
      <div class="metadata"></div>
      <template v-slot:actions>
        <a @click.prevent="askBeforeRemove(layout)">
          <el-icon><icon-delete/></el-icon> {{ $t('Remove') }}
        </a>
      </template>
    </GpItem>
  </div>
</template>
<script lang="ts" setup>
import {useLayoutsList} from '../compositions/layouts'
import {useConfirmAction} from '../../core/compositions/confirm-action'
import GpItem from '../../core/components/layout/GpItem.vue';

const {layouts, removeLayout} = useLayoutsList()

const askBeforeRemove = useConfirmAction(removeLayout);
</script>
<style scoped>
.metadata {
  padding-bottom: 15px;
}
</style>
