<template>
  <div>
    <AssetsStorageSelector @change="selectedStorage = $event._id" />
    <BasicFileUploader
      v-if="selectedStorage"
      :storage="selectedStorage"
      @upload="uploadComplete"
    />
  </div>
</template>
<script>
  import AssetsStorageSelector from './AssetsStorageSelector.vue'
  import BasicFileUploader from './BasicFileUploader.vue'
  import { ref } from 'vue'

  export default {
    name: 'AssetUploader',
    components: { BasicFileUploader, AssetsStorageSelector },
    setup(_, { emit }) {
      const selectedStorage = ref(null)

      return {
        selectedStorage,
        uploadComplete({ publicUrl }) {
          emit('change', publicUrl)
        }
      }
    }
  }
</script>
