<template>
  <el-form class="block-form" @submit.native.prevent="submit">
    <div>
      <FormInput
        title="Name"
        v-model="name"
      />
      <FormInput
        title="Description"
        v-model="description"
      />
      <el-form-item label="Content" class="form-item-flex">
        <div>
          <gp-editor :model-value="content" @input="content = $event" :config="editorConfig"/>
        </div>
      </el-form-item>
      <el-button native-type="submit" :loading="submitting">{{ $t('SAVE') }}</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import FormInput from '../../core/components/forms/FormInput.vue'
import {clearNulls} from '../../core/utils/clear-nulls'
import {useBlockForm} from '../compositions/blocks'
import {useEditorConfig} from '../../posts/compositions/gp-editor'
import {useUnsavedChanges} from '../../drafts/compositions/unsaved-changes'
import {IBlock} from '../../../services/types/block';

const props = defineProps({
  block: Object as () => IBlock,
  submitting: Boolean
})

const emit = defineEmits(['submitted'])

const {editedBlock, name, content, description} = useBlockForm(props)
const {editorConfig} = useEditorConfig()

useUnsavedChanges('block', props.block._id, computed(() => props.block.name), editedBlock)

const submit = () => emit('submitted', clearNulls(editedBlock))
</script>
<style scoped>
.block-form {
  padding: 0 10px;
}

.block-form >>> .ck-editor .ck-editor__editable {
  min-height: 48vh;
}
</style>
