<template>
  <el-form class="layout-form" @submit.native.prevent="submit">
    <div class="flex-row">
      <PageTitle :title="'Edit Layout'" :item-name="layout.kind"/>
      <div class="ops">
        <el-button type="text" @click="openStylesMarket">
          <el-icon>
            <icon-Suitcase/>
          </el-icon>
        </el-button>
        <SaveButton :submitting="submitting"/>
      </div>
    </div>
    <div>
      <LayoutConnectedData :connected-data="connectedData"
                           @remove="removeConnectedData"/>

      <view-builder ref="builder"
                    :layout="layout" :plugins="plugins"
                    @create="onCreateItem"
                    @edit="onEditItem"
                    @change="onChangeItem"></view-builder>

    </div>
    <LayoutItemModal v-if="editedItem"
                     :layout-item="editedItem"
                     :styles="layoutStyles"
                     @cancel="editedItem = null"
                     @submit="onChangeContent($event); check();"/>
    <StylesMarketplaceModal v-if="isMarketOpen"
                            @cancel="isMarketOpen = false"
                            @submit="addStyles($event); check();"/>
  </el-form>

</template>
<script lang="ts" setup>
import {ref, toRef} from 'vue'
import {ILayout} from '@greenpress/sdk/dist/layouts';
import {clearNulls} from '../../core/utils/clear-nulls'
import {useLayoutForm} from '../compositions/layouts';

import '@greenpress/view-builder/dist/index.es.js';
import '@greenpress/view-builder/dist/style.css';
import {getStylesheetContent, usePlugins} from '@/modules/layouts/compositions/layout-plugins';
import LayoutConnectedData from '@/modules/layouts/components/LayoutConnectedData.vue';
import LayoutItemModal from '@/modules/layouts/components/LayoutItemModal.vue';
import {useLayoutBuilder} from '@/modules/layouts/compositions/layout-builder';
import {useLayoutStyles} from '@/modules/layouts/compositions/layout-styles';
import PageTitle from '@/modules/core/components/semantics/PageTitle.vue';
import SaveButton from '@/modules/core/components/forms/SaveButton.vue';
import StylesMarketplaceModal from '@/modules/layouts/components/StylesMarketplaceModal.vue';

const props = defineProps({
  layout: Object as () => ILayout,
  submitting: Boolean
})

const plugins = usePlugins(props.layout.kind)
const isMarketOpen = ref(false)

const emit = defineEmits(['submitted'])

const {editedLayout, content, connectedData, kind} = useLayoutForm(props)
const {builder, editedItem, onChangeItem, onCreateItem, onEditItem, onChangeContent} = useLayoutBuilder({
  content,
  connectedData,
  layout: toRef(props, 'layout')
})
const {layoutStyles, check} = useLayoutStyles(content)

function addStyles({cssFiles}) {
  isMarketOpen.value = false;
  content.value = cssFiles.map(getStylesheetContent).concat(content.value);
  props.layout.content = content.value;
  builder.value.layout = props.layout;
}

function openStylesMarket() {
  isMarketOpen.value = true;
}

function removeConnectedData(itemToRemove) {
  connectedData.value = connectedData.value.filter(cd => cd.reference !== itemToRemove.reference);
}

// useUnsavedChanges('layout', props.layout._id, computed(() => props.layout.kind), editedLayout)

const submit = () => emit('submitted', clearNulls(editedLayout))

</script>
<style scoped>
.layout-form {
  padding: 0 10px;
}

.ops {
  margin-inline: auto 0;
  align-self: center;
  flex: 0;
  display: flex;
  flex-direction: row;
}
</style>
<style>
view-builder {
  margin: 10px 0;
  background: rgba(200, 200, 200, 0.2);
}

builder-plugins, builder-layout {
  max-height: 72vh;
  overflow: auto;
}

builder-plugins {
  max-width: 200px;
  padding: 10px;
}

builder-layout {
  display: block;
}

builder-plugin-item {
  background-color: #efefef;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  margin-block-end: 10px;
}

builder-plugin-item:hover {
  background-color: var(--third-color);
}

builder-layout-item[shown] {
  background-color: transparent;
  max-height: none;
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

builder-layout .item-label {
  line-height: 40px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 4px;
  background-color: #eee;
  color: #000;
}

builder-layout .item-label strong {
  color: #0a7080;
}
</style>
