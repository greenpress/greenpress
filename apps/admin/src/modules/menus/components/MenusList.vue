<template>
	<GpItem v-for="menu in menus" :key="menu">
		<template v-slot:title>
			<router-link :to="{name: 'editMenu', params: {menuName: menu}}">{{ menu }}</router-link>
		</template>
		<div>
			<small class="link" @click.prevent="remove(menu)"><el-icon><icon-delete/></el-icon> {{$t('Remove')}}</small>
		</div>
	</GpItem>
</template>
<script lang="ts" setup>
import { useMenusList } from '../compositions/menus-list'
import GpItem from '../../core/components/layout/GpItem.vue';

const {menus, remove} = useMenusList()
</script>
<style scoped lang="scss">

</style>
