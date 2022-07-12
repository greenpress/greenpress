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

h2 {
  strong {
    color: $main-color;

    &:before {
      content: ': ';
      color: black;
    }
  }
}

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

.buttons-group {
  padding: 0 10px;
  flex: 1;
  display: flex;
  justify-content: flex-end;

  a {
    margin: 0 5px;
    padding: 0 15px;
    line-height: 40px;
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &.active, &:active {
      background-color: #fff;
      box-shadow: 2px 2px #eee;
    }

    &:hover {
      color: $secondary-color;
      border: 0;
    }
  }
}
</style>
