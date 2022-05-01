<template>
	<span>
		<template v-if="link.kind === 'http'">
			<a :href="link.value.url" :target="link.value.newWindow ? '_blank' : '_self'">{{ link.value.text }}</a>
		</template>
    <template v-if="link.kind === 'category'">
			<router-link :to="link.category.path || '/'">{{ link.category.name }}</router-link>
		</template>
    <template v-if="link.kind === 'post'">
			<router-link :to="link.post.category.path + '/' + link.post.path">{{ link.post.title }}</router-link>
		</template>
	</span>
</template>
<script lang="ts">
export default {
  name: 'MenuLink',
  props: {
    link: Object
  }
}
</script>
