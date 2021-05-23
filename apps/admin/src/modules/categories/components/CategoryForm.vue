<template>
  <el-form class="category-form" @submit.native.prevent="submit">
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
    <el-button native-type="submit" :loading="submitting">{{$t('SAVE')}}</el-button>
  </el-form>
</template>
<script>
  import FormInput from '@/modules/core/components/forms/FormInput.vue'
  import { clearNulls } from '@/modules/core/utils/clear-nulls'
  import { useCategoryForm } from '../compositions/categories'
  import { useEditorConfig } from '@/modules/posts/compositions/gp-editor'
  import { useUnsavedChanges } from '@/modules/drafts/compositions/unsaved-changes.ts'
  import { computed } from 'vue'

  export default {
    name: 'CategoryForm',
    components: { FormInput },
    props: {
      isHomePage: Boolean,
      category: Object,
      submitting: Boolean
    },
    setup(props, { emit }) {
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
<style scoped></style>
