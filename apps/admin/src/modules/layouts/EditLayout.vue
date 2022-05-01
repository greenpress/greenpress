<template>
  <form v-if="layout" @submit.native.prevent="updateLayout({kind, content: newContent})">
    <PageTitle :title="'Edit Layout'" :item-name="layout.kind"/>
    <textarea v-model="json" />
    <el-button native-type="submit" :loading="submitting">{{ $t('SAVE') }}</el-button>
  </form>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
import {useEditLayout} from './compositions/layouts'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {LayoutKind} from '@greenpress/sdk/dist/layouts';
import {computed, ref} from 'vue';

const kind = useRoute().params.kind as LayoutKind;
const {layout, submitting, updateLayout} = useEditLayout(kind);

const newContent = ref('');
const json = computed({
  get: () => JSON.stringify(newContent.value || layout.value.content, null, 2),
  set: (newVal) => {
    try {
      newContent.value = JSON.parse(newVal)
    } catch {
      //
    }
  },
})

</script>
<style scoped>
textarea {
  width: 100%;
  min-height: 500px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
