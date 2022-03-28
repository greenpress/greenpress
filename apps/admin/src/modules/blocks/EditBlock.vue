<template>
  <div v-if="block">
    <PageTitle :title="'Edit Block'" :item-name="block.name"/>
    <BlockForm :block="block" :submitting="submitting" @submitted="updateBlock"/>
  </div>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {useEditBlock} from './compositions/blocks'
import BlockForm from './components/BlockForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'

const blockId = useRoute().params.blockId as string;
const {block, submitting, updateBlock} = useEditBlock(blockId);
</script>
