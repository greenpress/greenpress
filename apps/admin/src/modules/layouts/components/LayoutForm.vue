<template>
  <el-form class="layout-form" @submit.native.prevent="submit">
    <div>
      <el-select v-model="data.kind" class="m-2" placeholder="Select" size="large">
        <el-option label="Index" value="index"/>
        <el-option label="Category" value="category"/>
        <el-option label="Post" value="post"/>
        <el-option label="Search" value="search"/>
        <el-option label="Tags" value="tag"/>
      </el-select>

      <view-builder ref="builder" :layout="layout" @change="setLayoutFromBuilder"></view-builder>

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

const props = defineProps({
  layout: Object as () => ILayout,
  submitting: Boolean
})

const emit = defineEmits(['submitted'])

const data = useLayoutForm(props)

function setLayoutFromBuilder(event) {
  data.editedLayout.content = event.detail.layout.content;
}

useUnsavedChanges('layout', props.layout._id, computed(() => props.layout.kind), data.editedLayout)

const submit = () => emit('submitted', clearNulls(data.editedLayout))
</script>
<style scoped>
.layout-form {
  padding: 0 10px;
}
</style>
