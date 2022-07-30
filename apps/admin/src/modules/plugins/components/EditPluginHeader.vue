<template>
  <div class="edit-header">
    <h2>{{ $t('Edit Plugin') }}<strong>{{ plugin.name }}</strong></h2>
    <div class="buttons-group">
      <el-button native-type="submit" type="primary" :loading="submitting">
        <el-icon>
          <icon-promotion/>
        </el-icon>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {IPlugin} from '@/services/types/plugin';

const props = defineProps({
  plugin: Object as () => IPlugin,
  submitting: Boolean
})
</script>
