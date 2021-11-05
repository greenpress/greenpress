<template>
  <el-form @submit.native.prevent="updateMenu">
    <MenuLinkInput v-for="(item, $index) in links" :value="item" :key="$index"
                   @removed="removeLink"
                   @changed="updateLink"/>
   <AddMore @click="addLink"/>
    <el-button native-type="submit">{{ $t('SAVE') }}</el-button>
  </el-form>
</template>
<script lang="ts">
import MenuLinkInput from './MenuLinkInput.vue'
import {useMenuOperations} from '../compositions/menus'
import AddMore from '../../core/components/forms/AddMore.vue';

export default {
  name: 'MenuEditor',
  components: {AddMore, MenuLinkInput},
  props: {
    menu: String
  },
  setup(props) {
    return useMenuOperations(props.menu)
  }
}
</script>
