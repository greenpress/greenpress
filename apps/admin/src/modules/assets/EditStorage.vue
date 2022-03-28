<template>
  <div class="add-storage-page">
    <PageTitle title="Edit Storage" :item-name="data.storage.name"/>
    <StorageForm
        v-if="!data.loading"
        :submitting="submitting"
        :value="data.storage"
        @submitted="submit"
    />
    <h3>{{ $t('Upload Files to Storage') }}:</h3>
    <BasicFileUploader :storage="routeParams.storageId"/>
  </div>
</template>
<script lang="ts" setup>
import StorageForm from './components/StorageForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import BasicFileUploader from './components/BasicFileUploader.vue'
import {useStorage} from './compositions/storages'
import {useSubmitting} from '../core/compositions/submitting'
import {updateStorage} from '@/modules/assets/store/storages'
import {useRoute} from 'vue-router'

const {params: routeParams} = useRoute()
const {data} = useStorage(routeParams.storageId as string)

const {submitting, submit} = useSubmitting(
    function save(changes) {
      const {_id, name, kind} = data.storage
      return updateStorage({
        _id,
        name,
        kind,
        ...changes
      }).then((newStorage) => Object.assign(data.storage, newStorage))
    },
    {
      success: 'Storage updated successfully',
      error: 'Failed to update storage'
    }
)
</script>
<style scoped>
h3 {
  padding: 10px;
}
</style>
