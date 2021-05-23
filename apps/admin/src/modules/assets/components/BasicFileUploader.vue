<template>
  <div class="basic-file-uploader">
    <el-input v-model="location" placeholder="Choose Location" />
    <el-upload
      class="uploader"
      drag
      :headers="headers"
      :action="uploadUrl"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
  import { ref } from 'vue'
  import { useAssetsUpload } from '../compositions/assets'

  export default {
    name: 'BasicFileUploader',
    props: {
      storage: String
    },
    setup(props, { root, emit }) {
      const location = ref('')
      const { headers, uploadUrl, setUploadUrl } = useAssetsUpload(
        props.storage,
        location
      )

      return {
        headers,
        uploadUrl,
        beforeUpload: (file) => {
          setUploadUrl(file)
          return root.$nextTick()
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
