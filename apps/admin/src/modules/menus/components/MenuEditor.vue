<template>
	<el-form @submit.native.prevent="updateMenu">
		<el-button @click="addLink" native-type="button">{{$t('ADD')}}</el-button>
		<MenuLinkInput v-for="(item, $index) in links" :value="item" :key="$index"
		               @removed="removeLink"
		               @changed="updateLink"/>
		<el-button native-type="submit">{{$t('SAVE')}}</el-button>
	</el-form>
</template>
<script lang="ts">
  import MenuLinkInput from './MenuLinkInput.vue'
  import { useMenuOperations } from '../compositions/menus'

  export default {
    name: 'MenuEditor',
    components: { MenuLinkInput },
    props: {
      menu: String
    },
    setup(props) {
      return useMenuOperations(props.menu)
    }
  }
</script>
