<template>
  <el-form class="category-form" @submit.native.prevent="submit">
    <EditCategoryHeader :category="category" :submitting="submitting" :is-home-page="isHomePage"/>
    <div class="form-content">
      <template v-if="!isHomePage">
        <div>
          <el-checkbox
              label="Public?"
              :size="'small'"
              :model-value="isPublic"
              @change="editedCategory.isPublic = $event"
          />
        </div>
        <FormInput
            title="Name"
            :model-value="name"
            @input="editedCategory.name = $event"
        />
        <FormInput
            title="Path"
            label="leave empty to auto-generate"
            :model-value="path"
            @input="editedCategory.path = $event"
        />
      </template>
      <el-form-item label="Content" class="form-item-flex">
        <div>
          <gp-editor :model-value="content" @input="editedCategory.content = $event" :config="editorConfig"/>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>
<script lang="ts">
import {computed} from 'vue'
import FormInput from '@/modules/core/components/forms/FormInput.vue'
import {clearNulls} from '@/modules/core/utils/clear-nulls'
import {useCategoryForm} from '../compositions/categories'
import {useEditorConfig} from '@/modules/posts/compositions/gp-editor'
import {useUnsavedChanges} from '@/modules/drafts/compositions/unsaved-changes'
import EditCategoryHeader from '@/modules/categories/components/EditCategoryHeader.vue';

export default {
  name: 'CategoryForm',
  components: {EditCategoryHeader, FormInput},
  props: {
    isHomePage: Boolean,
    category: Object,
    submitting: Boolean
  },
  setup(props, {emit}) {
    const data = useCategoryForm(props)

    useUnsavedChanges('category', props.category._id, computed(() => props.category.name), data.editedCategory)

    return {
      ...data,
      ...useEditorConfig(),
      submit: () => emit('submitted', clearNulls(data.editedCategory))
    }
  }
}
</script>
<style scoped>
.category-form {
  padding: 0;
}

.form-content {
  padding: 10px;
}
</style>
