<template>
	<el-form @submit.native.prevent="save">
    <template v-for="key in keys" :key="key">
      <el-switch
          v-if="valuesTypes[key].options.length === 2"
          v-model="valuesTypes[key].selected"
          :inactive-value="valuesTypes[key].options[0]"
          :active-value="valuesTypes[key].options[1]"
          :inactive-text="$t(valuesTypes[key].options[0])"
          :active-text="$t(valuesTypes[key].options[1])"/>
      <FormInput
          :title="key"
          v-model="updated[key]"
          :type="valuesTypes[key].selected"/>
    </template>

		<el-button native-type="submit" :loading="submitting">{{$t('SAVE')}}</el-button>
	</el-form>
</template>

<script>
  import { useEditMetadata } from '../compositions/metadata'
  import { clearNulls } from '../../core/utils/clear-nulls'
  import FormInput from '../../core/components/forms/FormInput.vue'

  export default {
    name: 'ConfigurationForm',
    components: { FormInput },
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

<style scoped>

</style>
