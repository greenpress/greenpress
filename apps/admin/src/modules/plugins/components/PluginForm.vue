<template>
  <el-form @submit.native.prevent="submit">
    <EditPluginHeader :plugin="plugin" :submitting="submitting"/>
    <div class="content">
      <FormInput title="Manifest URL" v-model="edit.manifestUrl"/>
      <div centered>
        <el-button type="text" class="refresh-manifest" @click="refreshPluginFromManifest">
          <el-icon>
            <icon-refresh/>
          </el-icon>
        </el-button>
      </div>
      <pre>{{ JSON.stringify(plugin, null, 2) }}</pre>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import EditPluginHeader from './EditPluginHeader.vue';

import {IPlugin} from '@/services/types/plugin';
import {reactive} from 'vue';
import FormInput from '@/modules/core/components/forms/FormInput.vue';
import pluginsService from '@/services/plugins-service';

const props = defineProps({
  plugin: Object as () => IPlugin,
  submitting: Boolean
});

const emit = defineEmits(['submitted']);

const edit = reactive<IPlugin>({...props.plugin});

async function refreshPluginFromManifest() {
  emit('submitted', {hardReset: true, manifestUrl: edit.manifestUrl});
}

const submit = () => alert('soon');
</script>
<style scoped>
.content {
  padding: 10px;
}

.refresh-manifest {
  text-align: center;
  font-size: 36px;
}

pre {
  max-width: 700px;
  overflow: auto;
}
</style>
