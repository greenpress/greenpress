<template>
	<GpItem v-for="menu in store.menus" :key="menu">
		<template v-slot:title>
			<router-link :to="{name: 'editMenu', params: {menuName: menu}}">{{ menu }}</router-link>
		</template>
		<div>
			<small class="link" @click.prevent="store.remove(menu)"><el-icon><icon-delete/></el-icon> {{$t('Remove')}}</small>
		</div>
	</GpItem>
</template>
<script lang="ts" setup>
import GpItem from '../../core/components/layout/GpItem.vue';
import useMenusList from '@/modules/menus/store/menus-list';

const store = useMenusList()
</script>
<style scoped lang="scss">

</style>
