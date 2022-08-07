<template>
  <div>
    <el-form-item :label="title ? $t(title) : null">
      <small v-if="label"> ({{ $t(label) }})</small>
      <small v-else-if="gap">&nbsp;</small>
      <slot name="pre"/>
      <el-input-number v-if="type === 'number'" v-on="listeners" :model-value="modelValue"/>
      <AssetUploader v-else-if="type === 'upload'" v-on="listeners" :value="modelValue" class="asset-upload"/>
      <el-input v-else v-on="listeners" :model-value="modelValue" :placeholder="placeholder" :native-type="type"
                :type="type"/>
    </el-form-item>
    <slot/>
  </div>
</template>

<script lang="ts">
import AssetUploader from '@/modules/assets/components/AssetUploader.vue'

export default {
  name: 'FormInput',
  components: {AssetUploader},
  props: {
    title: String,
    label: String,
    type: String,
    placeholder: String,
    gap: Boolean,
    modelValue: [String, Number, Object]
  },
  emits: ['input', 'change', 'update:modelValue'],
  setup(_, {emit}) {
    return {
      listeners: {
        input: (event) => {
          emit('input', event);
          emit('update:modelValue', event)
        },
        change: (event) => emit('change', event)
      }
    }
  }
}
</script>

<style scoped>
.asset-upload {
  clear: both;
}
</style>
