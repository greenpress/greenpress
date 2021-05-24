<template>
	<div class="comments-list">
		<div v-if="isMounted"
		     class="fb-comments"
		     :data-href="href"
		     data-width="100%" data-numposts="5"></div>
	</div>
</template>
<script>
  import { computed, watch } from '@nuxtjs/composition-api'
  import { isFrontMounted } from '~/compositions/front-mounted'

  export default {
    name: 'PostComments',
    props: {
      post: Object,
    },
    setup (props, { root }) {
      const href = computed(() => location.href)
      const isMounted = isFrontMounted()

      watch(() => isMounted.value, async () => {
        await root.$nextTick()
        if (isMounted.value && window.FB) {
          window.FB.XFBML.parse()
        }
      })
      return {
        href,
        isMounted
      }
    },
    head () {
      return {
        script: [{
          hid: 'facebook',
          src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=1126115047726666',
          crossorigin: 'anonymous',
          async: true, defer: true
        }]
      }
    }
  }
</script>
<style scoped>
	.comments-list {
		margin-top: 30px;
		min-height: 179px;
	}
</style>
