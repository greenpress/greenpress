<template>
	<div class="category-page">
		<PageTitle title="Edit Menu" :item-name="$route.params.menuName"/>
		<MenuEditor :menu="$route.params.menuName"/>
	</div>
</template>
<script>
  import MenuEditor from './components/MenuEditor.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'

  export default {
    name: 'EditMenu',
    components: { PageTitle, MenuEditor }
  }
</script>
