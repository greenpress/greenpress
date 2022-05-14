<template>
  <el-form class="layout-form" @submit.native.prevent="submit">
    <div>
<!--      <el-select v-model="kind" class="m-2" placeholder="Select" size="large">-->
<!--        <el-option label="Index" value="index"/>-->
<!--        <el-option label="Category" value="category"/>-->
<!--        <el-option label="Post" value="post"/>-->
<!--        <el-option label="Search" value="search"/>-->
<!--        <el-option label="Tags" value="tag"/>-->
<!--      </el-select>-->
      <LayoutConnectedData :connected-data="connectedData"
                           @remove="removeConnectedData"/>

      <view-builder ref="builder" :layout="layout" :plugins="plugins" @create="itemCreated"
                    @change="setLayoutFromBuilder"></view-builder>

      <el-button native-type="submit" :loading="submitting">{{ $t('SAVE') }}</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import {ILayout} from '@greenpress/sdk/dist/layouts';
import {clearNulls} from '../../core/utils/clear-nulls'
import {useUnsavedChanges} from '../../drafts/compositions/unsaved-changes'
import {useLayoutForm} from '../compositions/layouts';

import '@greenpress/view-builder/dist/index.es.js';
import '@greenpress/view-builder/dist/style.css';
import {usePlugins} from '@/modules/layouts/compositions/layout-plugins';
import {IOnCreateEventDetail} from '@greenpress/view-builder/src';
import LayoutConnectedData from '@/modules/layouts/components/LayoutConnectedData.vue';

const props = defineProps({
  layout: Object as () => ILayout,
  submitting: Boolean
})

const plugins = usePlugins(props.layout.kind)

const emit = defineEmits(['submitted'])

const {editedLayout, content, connectedData, kind} = useLayoutForm(props)

function setLayoutFromBuilder(event) {
  content.value = event.detail.layout.content;
}

function itemCreated(e) {
  const detail: IOnCreateEventDetail = e.detail;
  const plugin = detail.plugin;
  if (!plugin) {
    return;
  }
  if (plugin.connectedData) {
    const existingReference = editedLayout.connectedData.find(cd => cd.reference === plugin.connectedData.reference);
    if (!existingReference) {
      editedLayout.connectedData.push(plugin.connectedData);
    }
  }
}

function removeConnectedData(itemToRemove) {
  connectedData.value = connectedData.value.filter(cd => cd !== itemToRemove);
}

useUnsavedChanges('layout', props.layout._id, computed(() => props.layout.kind), editedLayout)

const submit = () => emit('submitted', clearNulls(editedLayout))
</script>
<style scoped>
.layout-form {
  padding: 0 10px;
}
</style>
