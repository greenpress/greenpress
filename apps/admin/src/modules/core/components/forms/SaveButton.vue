<template>
  <el-button native-type="submit" :loading="submitting">{{ $t(text) }}</el-button>
</template>

<script lang="ts" setup>
defineProps({
  submitting: Boolean,
  text: {type: String, default: 'SAVE'}
})
</script>
