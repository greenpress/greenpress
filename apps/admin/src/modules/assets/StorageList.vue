<template>
	<div class="storage-page">
		<ListPageTitle title="Storage" create-route="addStorage"/>
		<AssetsStorageList/>
	</div>
</template>
<script lang="ts">
  import AssetsStorageList from './components/AssetsStorageList.vue'
  import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'

  export default {
    name: 'StorageList',
    components: { ListPageTitle, AssetsStorageList }
  }
</script>
<style scoped>
	p {
		padding: 5px 10px;
	}
</style>
