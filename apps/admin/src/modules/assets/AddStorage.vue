<template>
  <div class="add-storage-page">
    <PageTitle title="Add new Storage"/>
    <StorageForm @submitted="submit" :submitting="submitting"/>
  </div>
</template>
<script lang="ts" setup>
import {useRouter} from 'vue-router'
import StorageForm from './components/StorageForm.vue'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {useSubmitting} from '../core/compositions/submitting'
import {addStorage} from '@/modules/assets/store/storages'

const router = useRouter()
const {submitting, submit} = useSubmitting(
    async function onCreate(data) {
      const storage = await addStorage(data)
      await router.push({
        name: 'editStorage',
        params: {storageId: storage._id}
      })
    },
    {
      success: 'Storage created successfully',
      error: 'Failed to create storage'
    }
)
</script>
