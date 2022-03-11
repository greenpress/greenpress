<template>
  <div class="basic-file-uploader">
    <el-input v-model="location" placeholder="Choose Location" />
    <el-upload
      class="uploader"
      drag
      :headers="headers"
      :action="uploadUrl"
			:with-credentials="withCredentials"
			:on-success="onSuccess"
      :before-upload="beforeUpload"
    >
      <el-icon><upload /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
  </div>
</template>
<script lang="ts">
  import { ref, nextTick } from 'vue'
  import { useAssetsUpload } from '../compositions/assets'

  export default {
    name: 'BasicFileUploader',
    props: {
      storage: String
    },
    setup(props, { emit }) {
      const location = ref('')
			const { headers, uploadUrl, setUploadUrl, withCredentials } = useAssetsUpload(
        props.storage,
        location
      )

      return {
        headers,
				withCredentials,
        uploadUrl,
        beforeUpload: (file) => {
          setUploadUrl(file)
          return nextTick()
        },
        location,
        onSuccess(res) {
          emit('upload', res)
        }
      }
    }
  }
</script>
<style scoped>
  .basic-file-uploader {
    padding: 0 10px;
  }

  .uploader :deep(.el-upload),
  .uploader :deep(.el-upload-dragger) {
    width: 100%;
  }
</style>
