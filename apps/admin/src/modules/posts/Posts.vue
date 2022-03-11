<template>
	<div class="posts-page">
		<ListPageTitle title="Posts" create-route="createPost"/>
		<PostsList/>
	</div>
</template>
<script lang="ts" setup>
  import PostsList from './components/PostsList.vue'
  import ListPageTitle from '../core/components/semantics/ListPageTitle.vue'
</script>
