<template>
	<div class="categories-page">
		<ListPageTitle title="Categories" create-route="createCategory"/>
		<CategoriesList/>
	</div>
</template>
<script lang="ts" setup>
  import CategoriesList from './components/CategoriesList.vue'
  import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
</script>
