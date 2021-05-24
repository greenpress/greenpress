<template>
	<div class="share" v-if="isMounted">
		<a :href="links.fb" target="_blank" class="fb">
			<i class="socicon-facebook"></i>
		</a>
		<a :href="links.linkedin" target="_blank" class="linkedin">
			<i class="socicon-linkedin"></i>
		</a>
		<a :href="links.twitter" target="_blank" class="twitter">
			<i class="socicon-twitter"></i>
		</a>
	</div>
</template>
<script>
  import { computed, useMeta, defineComponent } from '@nuxtjs/composition-api'
  import { isFrontMounted } from '~/compositions/front-mounted'
  import { locationHref } from '~/compositions/location-href'

	export default defineComponent({
		name: 'SharePost',
		props: {
			post: Object
		},
    head: {},
		setup (props) {
			const isMounted = isFrontMounted()
			const href = locationHref()
			const links = computed(() => {
				return {
					fb: 'https://www.facebook.com/share.php?u=' + href.value,
					linkedin: 'https://www.linkedin.com/cws/share?url=' + href.value,
					twitter: `https://twitter.com/intent/tweet?text=${props.post.title}&url=${href.value}`
				}
			})
			useMeta({
				link: [
					{ rel: 'stylesheet', href: '/socicon/css/socicon.min.css' }
				]
			})
			return {
				isMounted,
				href,
				links
			}
		}
	})
</script>
<style scoped lang="scss">
	@import "../colors";

	.share {
		display: flex;
		max-width: 500px;
		margin: 0 auto;

		> a {
			flex: 1;
			padding: 10px;
			text-align: center;
			text-decoration: none;
			transition: opacity 0.2s ease-in-out;
			color: #fff;

			&:hover {
				opacity: 0.8;
			}
		}
	}

	.fb {
		background-color: #3e5b98;
	}

	.linkedin {
		background-color: #3371b7;
	}

	.twitter {
		background-color: #4da7de;
	}

</style>
