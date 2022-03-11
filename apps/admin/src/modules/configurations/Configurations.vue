<template>
	<div class="categories-page">
		<PageTitle title="Configurations"/>
		<ConfigurationsList/>
	</div>
</template>
<script lang="ts" setup>
  import ConfigurationsList from './components/ConfigurationsList.vue'
  import PageTitle from '../core/components/semantics/PageTitle.vue'
</script>
