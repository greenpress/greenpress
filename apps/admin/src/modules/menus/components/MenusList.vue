<template>
	<GpItem v-for="menu in menus" :key="menu">
		<template v-slot:title>
			<router-link :to="{name: 'editMenu', params: {menuName: menu}}">{{ menu }}</router-link>
		</template>
		<div>
			<small class="link" @click.prevent="remove(menu)"><i class="el-icon-delete"/> {{$t('Remove')}}</small>
		</div>
	</GpItem>
</template>
<script>
import { useMenusList } from '../compositions/menus-list'
import GpItem from '../../core/components/layout/GpItem.vue';

export default {
	name: 'MenusList',
	components: { GpItem },
	setup() {
		return useMenusList()
	}
}
</script>
<style scoped lang="scss">

</style>
