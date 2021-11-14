<template>
	<div class="categories-page">
		<PageTitle title="Drafts"/>
    <DraftsList/>
	</div>
</template>
<script lang="ts">
  import PageTitle from '../core/components/semantics/PageTitle.vue'
  import DraftsList from './components/DraftsList.vue'

  export default {
    name: 'Drafts',
    components: { DraftsList, PageTitle }
  }
</script>
