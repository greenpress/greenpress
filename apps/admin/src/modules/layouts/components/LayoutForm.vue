<template>
  <el-form class="layout-form" @submit.native.prevent="submit">
    <div>
      <LayoutConnectedData :connected-data="connectedData"
                           @remove="removeConnectedData"/>

      <view-builder ref="builder"
                    :layout="layout" :plugins="plugins"
                    @create="onCreateItem"
                    @edit="onEditItem"
                    @change="onChangeItem"></view-builder>

      <el-button native-type="submit" :loading="submitting">{{ $t('SAVE') }}</el-button>
    </div>
    <LayoutItemModal v-if="editedItem" :layout-item="editedItem.content" @cancel="editedItem = null"
                     :styles="layoutStyles"
                     @submit="onChangeContent($event); check();"/>
  </el-form>

</template>
<script lang="ts" setup>
import {toRef} from 'vue'
import {ILayout} from '@greenpress/sdk/dist/layouts';
import {clearNulls} from '../../core/utils/clear-nulls'
import {useLayoutForm} from '../compositions/layouts';

import '@greenpress/view-builder/dist/index.es.js';
import '@greenpress/view-builder/dist/style.css';
import {usePlugins} from '@/modules/layouts/compositions/layout-plugins';
import LayoutConnectedData from '@/modules/layouts/components/LayoutConnectedData.vue';
import LayoutItemModal from '@/modules/layouts/components/LayoutItemModal.vue';
import {useLayoutBuilder} from '@/modules/layouts/compositions/layout-builder';
import {useLayoutStyles} from '@/modules/layouts/compositions/layout-styles';

const props = defineProps({
  layout: Object as () => ILayout,
  submitting: Boolean
})

const plugins = usePlugins(props.layout.kind)

const emit = defineEmits(['submitted'])

const {editedLayout, content, connectedData, kind} = useLayoutForm(props)
const {builder, editedItem, onChangeItem, onCreateItem, onEditItem, onChangeContent} = useLayoutBuilder({
  content,
  connectedData,
  layout: toRef(props, 'layout')
})
const {layoutStyles, check} = useLayoutStyles(content)

function removeConnectedData(itemToRemove) {
  connectedData.value = connectedData.value.filter(cd => cd !== itemToRemove);
}

// useUnsavedChanges('layout', props.layout._id, computed(() => props.layout.kind), editedLayout)

const submit = () => emit('submitted', clearNulls(editedLayout))

</script>
<style scoped>
.layout-form {
  padding: 0 10px;
}
</style>
<style>
view-builder {
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.2);
}

builder-plugins {
  max-width: 150px;
}

builder-layout-item[shown] {
  background-color: transparent;
}

builder-layout-item[shown].hover {
  background: rgba(255, 255, 255, 0.3);
}

builder-layout .flex-row {
  display: flex;
  flex-direction: row;
}

builder-layout .flex-row > * {
  flex: 1;
}
</style>
