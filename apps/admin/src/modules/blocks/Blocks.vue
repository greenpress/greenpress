<template>
	<div class="blocks-page">
		<ListPageTitle title="Blocks" create-route="createBlock"/>
		<BlocksList/>
	</div>
</template>
<script lang="ts">
  import BlocksList from './components/BlocksList.vue'
  import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'

  export default {
    name: 'Blocks',
    components: { ListPageTitle, BlocksList }
  }
</script>
