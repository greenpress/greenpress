<template>
  <div class="edit-header">
    <h2>{{ title }}<strong v-if="!isHomePage && category.name">{{ category.name }}</strong></h2>
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
import {computed} from 'vue';
import {translate} from '@/plugins/i18n';

const props = defineProps({
  category: Object,
  isHomePage: Boolean,
  submitting: Boolean
})
const title = computed(() => translate(props.isHomePage ? 'Edit' : props.category._id ? 'Edit category' : 'Create Category'));
</script>

<style scoped lang="scss">
@import "../../../style/colors";

@media screen and (max-width: 780px) {
  h2 {
    font-size: 11px;
  }
  h2 strong {
    display: none;
  }
  .buttons-group {
    padding: 0 6px;
  }

  .el-button {
    font-size: 11px;
    padding: 8px;
    min-height: 20px;
  }
}
</style>
