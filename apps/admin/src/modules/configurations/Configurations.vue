<template>
	<div class="categories-page">
		<PageTitle title="Configurations"/>
		<ConfigurationsList/>
	</div>
</template>
<script>
  import ConfigurationsList from './components/ConfigurationsList.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'

  export default {
    components: { PageTitle, ConfigurationsList }
  }
</script>
