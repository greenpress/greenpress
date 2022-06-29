<template>
	<el-form @submit.native.prevent="save">
    <ConfigurationInput
      v-for="key in keys"
      :key="key"
      v-model="updated[key]"
      :valueType="valuesTypes[key]" />
    <SaveButton :submitting="submitting"/>
	</el-form>
</template>

<script lang="ts">
  import { useEditMetadata } from '../compositions/metadata'
  import { clearNulls } from '../../core/utils/clear-nulls'
  import FormInput from '../../core/components/forms/FormInput.vue'
  import ConfigurationInput from './ConfigurationInput.vue'
  import SaveButton from '@/modules/core/components/forms/SaveButton.vue';

  export default {
    name: 'ConfigurationForm',
    components: {SaveButton, FormInput, ConfigurationInput },
    props: {
      metadata: Object,
      submitting: Boolean
    },
    setup({ metadata }, { emit }) {
      const { updated, edited, keys, valuesTypes } = useEditMetadata(metadata)

      return {
        keys,
        valuesTypes,
        updated,
        edited,
        save() {
          emit('save', clearNulls(edited))
        }
      }
    }
  }
</script>
