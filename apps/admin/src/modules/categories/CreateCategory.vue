<template>
  <div class="category-page">
    <CategoryForm :category="{}" @submitted="submit"/>
  </div>
</template>
<script lang="ts" setup>
import CategoryForm from './components/CategoryForm.vue'
import {createCategory} from './compositions/categories'
import PageTitle from '../core/components/semantics/PageTitle.vue'
import {removeUnsavedChanges} from '@/modules/drafts/compositions/unsaved-changes'
import {useRouter} from 'vue-router'

const router = useRouter()

async function submit(data) {
  const {path} = await createCategory(data)
  removeUnsavedChanges('category')
  await router.push({
    name: 'editCategory',
    params: {categoryPath: path}
  })
}
</script>
