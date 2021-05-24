<template>
	<div class="tags">
		<nuxt-link v-for="tag in tags"
		           class="tag"
		           :key="tag"
		           :to="{params: {tag: tag}, name: 'tag-tag'}">{{tag}}
		</nuxt-link>
	</div>
</template>
<script>
  export default {
    props: {
      tags: Array,
    }
  }
</script>
<style scoped lang="scss">
	@import "../colors";
	.tag {
		display: inline-block;
		font-size: 80%;
		border-radius: 3px;
		padding: 2px 6px;
		background-color: $mainColor;
		color: #fff;
		margin: 0 2.5px;
		text-decoration: none;
		transition: background-color 0.2s linear;

		&:hover {
			background-color: $mainColorOpacity;
		}
	}
</style>
