<template>
	<span>
		<template v-if="link.kind === 'http'">
			<a :href="link.route" :target="link.newWindow ? '_blank' : '_self'">{{link.name}}</a>
		</template>
		<template v-else>
			<nuxt-link :to="link.route">{{link.name}}</nuxt-link>
		</template>
	</span>
</template>
<script>
  export default {
    name: 'MenuLink',
    props: {
      link: Object
    }
  }
</script>
