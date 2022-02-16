<template>
<div>
  <FormInput
      :title="valueType.title"
      :placeholder="valueType.placeholder"
      v-model="model"
      :type="valueType.selected">
      <template v-slot:pre v-if="valueType.options.length === 2">
        <el-switch
          v-model="valueType.selected"
          :inactive-value="valueType.options[0]"
          :active-value="valueType.options[1]"
          :inactive-text="$t(valueType.options[0])"
          :active-text="$t(valueType.options[1])"/>
      </template>
  </FormInput>
</div>
</template>

<script lang="ts">
import { computed } from 'vue'
  import FormInput from '../../core/components/forms/FormInput.vue'

  export default {
    name: 'ConfigurationInput',
    components: { FormInput },
    props: {
      valueType: Object,
      modelValue: String,
    },
    setup(props, { emit }) {
      const model = computed({
        get: () => props.modelValue instanceof Array ? props.modelValue.join(',') : props.modelValue,
        set: (value) => emit('update:modelValue', props.modelValue instanceof Array ? value.split(',') : value)
      });

      return {
        model
      }
    }
  }
</script>

<style scoped>
</style>
