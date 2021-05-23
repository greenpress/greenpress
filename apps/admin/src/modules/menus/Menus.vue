<template>
	<div class="menus-page">
    <ListPageTitle title="Menus" create-route="createMenu"/>
		<MenusList/>
	</div>
</template>
<script>
  import MenusList from './components/MenusList.vue'
  import ListPageTitle from '@/modules/core/components/semantics/ListPageTitle.vue'

  export default {
    name: 'Menus',
    components: { ListPageTitle, MenusList }
  }
</script>
