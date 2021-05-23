<template>
  <div class="select-storage">
    <label>{{$t('Storage')}}:</label>
    <el-select @change="change" :model-value="selected" class="storage-selection">
      <el-option
        v-for="item in items"
        :key="item._id"
        :value="item"
        :label="item.name"
      />
    </el-select>
  </div>
</template>
<script>
  import { useStorageList } from '../compositions/storages'
  import { useModelChange } from '../../core/compositions/model-change'

  export default {
    name: 'AssetsStorageSelector',
    props: {
      value: String
    },
    setup(props, { emit }) {
      const { items } = useStorageList()
      const { selected, change } = useModelChange(props.value, items, emit)
      return {
        items,
        selected,
        change
      }
    }
  }
</script>
<style scoped>
  .select-storage {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .storage-selection {
    padding-left: 10px;
    flex: 1;
  }
</style>
